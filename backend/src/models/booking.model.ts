import { query } from '../utils/database';

export interface Booking {
  id: string;
  mentor_id: string;
  mentee_id: string;
  start_time: Date;
  end_time: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

export interface BookingWithDetails extends Booking {
  mentor: {
    first_name: string;
    last_name: string;
    email: string;
    profile_picture?: string;
  };
  mentee: {
    first_name: string;
    last_name: string;
    email: string;
    profile_picture?: string;
  };
}

export class BookingModel {
  static async createBooking(
    mentorId: string,
    menteeId: string,
    startTime: Date,
    endTime: Date
  ): Promise<Booking> {
    const result = await query(
      `INSERT INTO bookings 
       (mentor_id, mentee_id, start_time, end_time, status) 
       VALUES ($1, $2, $3, $4, 'pending') 
       RETURNING *`,
      [mentorId, menteeId, startTime, endTime]
    );
    return result.rows[0];
  }

  static async updateBookingStatus(
    bookingId: string,
    status: Booking['status']
  ): Promise<Booking> {
    const result = await query(
      `UPDATE bookings 
       SET status = $1, updated_at = NOW() 
       WHERE id = $2 
       RETURNING *`,
      [status, bookingId]
    );
    return result.rows[0];
  }

  static async getBookingById(bookingId: string): Promise<BookingWithDetails | null> {
    const result = await query(
      `SELECT 
        b.*,
        m.first_name as mentor_first_name,
        m.last_name as mentor_last_name,
        m.email as mentor_email,
        m.profile_picture as mentor_profile_picture,
        e.first_name as mentee_first_name,
        e.last_name as mentee_last_name,
        e.email as mentee_email,
        e.profile_picture as mentee_profile_picture
      FROM bookings b
      JOIN user_profiles m ON b.mentor_id = m.user_id
      JOIN user_profiles e ON b.mentee_id = e.user_id
      WHERE b.id = $1`,
      [bookingId]
    );
    return result.rows[0] || null;
  }

  static async getUserBookings(
    userId: string,
    role: 'mentor' | 'mentee',
    status?: Booking['status']
  ): Promise<BookingWithDetails[]> {
    const column = role === 'mentor' ? 'mentor_id' : 'mentee_id';
    let queryString = `
      SELECT 
        b.*,
        m.first_name as mentor_first_name,
        m.last_name as mentor_last_name,
        m.email as mentor_email,
        m.profile_picture as mentor_profile_picture,
        e.first_name as mentee_first_name,
        e.last_name as mentee_last_name,
        e.email as mentee_email,
        e.profile_picture as mentee_profile_picture
      FROM bookings b
      JOIN user_profiles m ON b.mentor_id = m.user_id
      JOIN user_profiles e ON b.mentee_id = e.user_id
      WHERE b.${column} = $1
    `;

    const values: any[] = [userId];
    if (status) {
      queryString += ' AND b.status = $2';
      values.push(status);
    }

    queryString += ' ORDER BY b.start_time DESC';

    const result = await query(queryString, values);
    return result.rows;
  }

  static async checkAvailability(
    mentorId: string,
    startTime: Date,
    endTime: Date
  ): Promise<boolean> {
    const result = await query(
      `SELECT COUNT(*) as count 
       FROM bookings 
       WHERE mentor_id = $1 
       AND status IN ('pending', 'confirmed')
       AND (
         (start_time <= $2 AND end_time >= $2)
         OR (start_time <= $3 AND end_time >= $3)
         OR (start_time >= $2 AND end_time <= $3)
       )`,
      [mentorId, startTime, endTime]
    );
    return result.rows[0].count === '0';
  }
} 