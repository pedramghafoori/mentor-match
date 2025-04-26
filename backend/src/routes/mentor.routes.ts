import { Router } from 'express';
import { mentorController } from '../controllers/mentor.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', mentorController.getAllMentors);
router.get('/:id', mentorController.getMentorById);
router.get('/:id/certifications', mentorController.getMentorCertifications);

// Protected routes
router.post('/', authMiddleware, mentorController.createMentorProfile);
router.put('/:id', authMiddleware, mentorController.updateMentorProfile);
router.delete('/:id', authMiddleware, mentorController.deleteMentorProfile);

export const mentorRoutes = router; 