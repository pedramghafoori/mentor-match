import { Request, Response } from 'express';

export const mentorController = {
  // Add your mentor controller methods here
  getMentors: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
  getMentorById: (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented' });
  },
}; 