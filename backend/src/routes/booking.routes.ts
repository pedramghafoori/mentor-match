import { Router } from 'express';
import { bookingController } from '../controllers/booking.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// All routes are protected
router.use(authMiddleware);

// Booking routes
router.post('/', bookingController.createBooking);
router.get('/user', bookingController.getUserBookings);
router.get('/mentor', bookingController.getMentorBookings);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.cancelBooking);

export const bookingRoutes = router; 