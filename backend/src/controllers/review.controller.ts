import { Request, Response } from 'express';

export const reviewController = {
  getMentorReviews: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
  getMenteeReviews: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
  createReview: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
  updateReview: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
  deleteReview: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
}; 