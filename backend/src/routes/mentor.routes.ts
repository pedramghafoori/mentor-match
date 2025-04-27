import { Router } from 'express';
import { mentorController } from '../controllers/mentor.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/* ---------- public ---------- */
router.get('/',             mentorController.getAllMentors);
router.get('/:id',          mentorController.getMentorById);
router.get(
  '/:id/certifications',
  mentorController.getMentorCertifications
);

/* ---------- protected ---------- */
router.post('/',        authMiddleware, mentorController.createMentorProfile);
router.put('/:id',      authMiddleware, mentorController.updateMentorProfile);
router.delete('/:id',   authMiddleware, mentorController.deleteMentorProfile);

export const mentorRoutes = router;