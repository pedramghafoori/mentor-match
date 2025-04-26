import { query } from '../utils/database';

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'mentor' | 'mentee';
  created_at: Date;
  updated_at: Date;
}

export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  city: string;
  profile_picture?: string;
  bio?: string;
  created_at: Date;
  updated_at: Date;
}

export class UserModel {
  static async createUser(email: string, password: string, role: 'mentor' | 'mentee'): Promise<User> {
    const result = await query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
      [email, password, role]
    );
    return result.rows[0];
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  static async findUserById(id: string): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async createUserProfile(
    userId: string,
    firstName: string,
    lastName: string,
    city: string,
    profilePicture?: string,
    bio?: string
  ): Promise<UserProfile> {
    const result = await query(
      `INSERT INTO user_profiles 
       (user_id, first_name, last_name, city, profile_picture, bio) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [userId, firstName, lastName, city, profilePicture, bio]
    );
    return result.rows[0];
  }

  static async updateUserProfile(
    userId: string,
    updates: Partial<Omit<UserProfile, 'id' | 'user_id' | 'created_at'>>
  ): Promise<UserProfile> {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    const values = [userId, ...Object.values(updates)];
    const result = await query(
      `UPDATE user_profiles 
       SET ${setClause}, updated_at = NOW() 
       WHERE user_id = $1 
       RETURNING *`,
      values
    );
    return result.rows[0];
  }

  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    const result = await query('SELECT * FROM user_profiles WHERE user_id = $1', [userId]);
    return result.rows[0] || null;
  }
} 