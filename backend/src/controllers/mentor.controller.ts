import { Request, Response } from 'express';

/**
 * NOTE: All handlers are bare-bones stubs that return 501 until you
 * implement logic.  They exist only to compile and let the app run.
 */
function notImplemented(res: Response, name: string) {
  return res.status(501).json({ message: `${name} is not implemented yet` });
}

export const mentorController = {
  /* ----- PUBLIC ------------------------------------------------------ */
  getAllMentors: (_req: Request, res: Response) =>
    notImplemented(res, 'getAllMentors'),

  getMentorById: (req: Request, res: Response) =>
    notImplemented(res, `getMentorById (${req.params.id})`),

  getMentorCertifications: (req: Request, res: Response) =>
    notImplemented(res, `getMentorCertifications (${req.params.id})`),

  /* ----- PROTECTED (requires auth middleware) ------------------------ */
  createMentorProfile: (req: Request, res: Response) =>
    notImplemented(res, 'createMentorProfile'),

  updateMentorProfile: (req: Request, res: Response) =>
    notImplemented(res, `updateMentorProfile (${req.params.id})`),

  deleteMentorProfile: (req: Request, res: Response) =>
    notImplemented(res, `deleteMentorProfile (${req.params.id})`),
};