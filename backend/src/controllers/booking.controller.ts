import { Request, Response } from 'express';

export const bookingController = {
  // Add your booking controller methods here
  createBooking: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
  getBookings: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
  list: (_: Request, res: Response) => res.json([]),
}; 