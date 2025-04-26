import { query } from '../utils/database';

export interface Review {
  id: string;
  mentor_id: string;
  mentee_id: string;
  rating: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
}

export interface ReviewWithDetails extends Review {
  mentor: {
    first_name: string;
    last_name: string;
    profile_picture?: string;
  };
  mentee: {
    first_name: string;
    last_name: string;
    profile_picture?: string;
  };
}

export class ReviewModel {
  static async createReview(
    mentorId: string,
    menteeId: string,
    rating: number,
    comment: string
  ): Promise<Review> {
    const result = await query(
      `INSERT INTO reviews 
       (mentor_id, mentee_id, rating, comment) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [mentorId, menteeId, rating, comment]
    );
    return result.rows[0];
  }

  static async updateReview(
    reviewId: string,
    rating: number,
    comment: string
  ): Promise<Review> {
    const result = await query(
      `UPDATE reviews 
       SET rating = $1, comment = $2, updated_at = NOW() 
       WHERE id = $3 
       RETURNING *`,
      [rating, comment, reviewId]
    );
    return result.rows[0];
  }

  static async deleteReview(reviewId: string): Promise<void> {
    await query('DELETE FROM reviews WHERE id = $1', [reviewId]);
  }

  static async getMentorReviews(mentorId: string): Promise<ReviewWithDetails[]> {
    const result = await query(
      `SELECT 
        r.*,
        m.first_name as mentor_first_name,
        m.last_name as mentor_last_name,
        m.profile_picture as mentor_profile_picture,
        e.first_name as mentee_first_name,
        e.last_name as mentee_last_name,
        e.profile_picture as mentee_profile_picture
      FROM reviews r
      JOIN user_profiles m ON r.mentor_id = m.user_id
      JOIN user_profiles e ON r.mentee_id = e.user_id
      WHERE r.mentor_id = $1
      ORDER BY r.created_at DESC`,
      [mentorId]
    );
    return result.rows;
  }

  static async getMenteeReviews(menteeId: string): Promise<ReviewWithDetails[]> {
    const result = await query(
      `SELECT 
        r.*,
        m.first_name as mentor_first_name,
        m.last_name as mentor_last_name,
        m.profile_picture as mentor_profile_picture,
        e.first_name as mentee_first_name,
        e.last_name as mentee_last_name,
        e.profile_picture as mentee_profile_picture
      FROM reviews r
      JOIN user_profiles m ON r.mentor_id = m.user_id
      JOIN user_profiles e ON r.mentee_id = e.user_id
      WHERE r.mentee_id = $1
      ORDER BY r.created_at DESC`,
      [menteeId]
    );
    return result.rows;
  }

  static async getMentorAverageRating(mentorId: string): Promise<number> {
    const result = await query(
      'SELECT COALESCE(AVG(rating), 0) as average_rating FROM reviews WHERE mentor_id = $1',
      [mentorId]
    );
    return parseFloat(result.rows[0].average_rating);
  }

  static async hasReviewed(mentorId: string, menteeId: string): Promise<boolean> {
    const result = await query(
      'SELECT COUNT(*) as count FROM reviews WHERE mentor_id = $1 AND mentee_id = $2',
      [mentorId, menteeId]
    );
    return result.rows[0].count > 0;
  }
} 