import express from 'express';
import cors from 'cors';
import { config } from './config/config';
import { authRoutes } from './routes/auth.routes';
import { mentorRoutes } from './routes/mentor.routes';
import { bookingRoutes } from './routes/booking.routes';
import { reviewRoutes } from './routes/review.routes';

const app = express();

// Middleware
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const PORT = Number(process.env.PORT) || Number(config.port) || 5000;
console.log('config.port is', config.port, 'process.env.PORT is', process.env.PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});