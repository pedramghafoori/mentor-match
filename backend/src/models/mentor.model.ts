import { query } from '../utils/database';
import { Certification } from '../services/certification.service';

export interface MentorProfile {
  id: string;
  user_id: string;
  lss_id: string;
  hourly_rate: number;
  availability: string;
  specialties: string[];
  created_at: Date;
  updated_at: Date;
}

export interface MentorWithProfile extends MentorProfile {
  user: {
    email: string;
    profile: {
      first_name: string;
      last_name: string;
      city: string;
      profile_picture?: string;
      bio?: string;
    };
  };
  certifications: Certification[];
  average_rating: number;
  total_reviews: number;
}

export class MentorModel {
  static async createMentorProfile(
    userId: string,
    lssId: string,
    hourlyRate: number,
    availability: string,
    specialties: string[]
  ): Promise<MentorProfile> {
    const result = await query(
      `INSERT INTO mentor_profiles 
       (user_id, lss_id, hourly_rate, availability, specialties) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [userId, lssId, hourlyRate, availability, specialties]
    );
    return result.rows[0];
  }

  static async updateMentorProfile(
    userId: string,
    updates: Partial<Omit<MentorProfile, 'id' | 'user_id' | 'created_at'>>
  ): Promise<MentorProfile> {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    const values = [userId, ...Object.values(updates)];
    const result = await query(
      `UPDATE mentor_profiles 
       SET ${setClause}, updated_at = NOW() 
       WHERE user_id = $1 
       RETURNING *`,
      values
    );
    return result.rows[0];
  }

  static async getMentorProfile(userId: string): Promise<MentorProfile | null> {
    const result = await query('SELECT * FROM mentor_profiles WHERE user_id = $1', [userId]);
    return result.rows[0] || null;
  }

  static async getAllMentors(
    limit: number = 10,
    offset: number = 0,
    filters?: {
      city?: string;
      specialties?: string[];
      minRating?: number;
    }
  ): Promise<MentorWithProfile[]> {
    let queryString = `
      SELECT 
        mp.*,
        u.email,
        up.first_name,
        up.last_name,
        up.city,
        up.profile_picture,
        up.bio,
        COALESCE(AVG(r.rating), 0) as average_rating,
        COUNT(r.id) as total_reviews
      FROM mentor_profiles mp
      JOIN users u ON mp.user_id = u.id
      JOIN user_profiles up ON u.id = up.user_id
      LEFT JOIN reviews r ON mp.user_id = r.mentor_id
    `;

    const values: any[] = [];
    let whereClauses: string[] = [];
    let paramCount = 1;

    if (filters) {
      if (filters.city) {
        whereClauses.push(`up.city = $${paramCount}`);
        values.push(filters.city);
        paramCount++;
      }

      if (filters.specialties && filters.specialties.length > 0) {
        whereClauses.push(`mp.specialties && $${paramCount}`);
        values.push(filters.specialties);
        paramCount++;
      }

      if (filters.minRating) {
        whereClauses.push(`COALESCE(AVG(r.rating), 0) >= $${paramCount}`);
        values.push(filters.minRating);
        paramCount++;
      }
    }

    if (whereClauses.length > 0) {
      queryString += ' WHERE ' + whereClauses.join(' AND ');
    }

    queryString += `
      GROUP BY mp.id, u.id, up.id
      ORDER BY average_rating DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    values.push(limit, offset);

    const result = await query(queryString, values);
    return result.rows;
  }

  static async getMentorById(mentorId: string): Promise<MentorWithProfile | null> {
    const result = await query(
      `SELECT 
        mp.*,
        u.email,
        up.first_name,
        up.last_name,
        up.city,
        up.profile_picture,
        up.bio,
        COALESCE(AVG(r.rating), 0) as average_rating,
        COUNT(r.id) as total_reviews
      FROM mentor_profiles mp
      JOIN users u ON mp.user_id = u.id
      JOIN user_profiles up ON u.id = up.user_id
      LEFT JOIN reviews r ON mp.user_id = r.mentor_id
      WHERE mp.user_id = $1
      GROUP BY mp.id, u.id, up.id`,
      [mentorId]
    );
    return result.rows[0] || null;
  }
} 