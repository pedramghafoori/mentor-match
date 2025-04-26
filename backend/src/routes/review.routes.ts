import { Router } from 'express';
import { reviewController } from '../controllers/review.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/mentor/:mentorId', reviewController.getMentorReviews);
router.get('/mentee/:menteeId', reviewController.getMenteeReviews);

// Protected routes
router.use(authMiddleware);
router.post('/', reviewController.createReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

export const reviewRoutes = router; 