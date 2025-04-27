import { Request, Response } from 'express';

export const bookingController = {
  // Add your booking controller methods here
  createBooking: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
  getUserBookings: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
  getMentorBookings: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
  updateBooking: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
  cancelBooking: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
  list: (_: Request, res: Response) => res.json([]),
}; 