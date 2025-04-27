import dotenv from 'dotenv';

dotenv.config();

// Make sure to set JWT_SECRET and JWT_EXPIRES_IN in your .env file for production!
// Example .env:
// JWT_SECRET=your-very-secure-secret-key
// JWT_EXPIRES_IN=24h

export const config = {
  port: process.env.PORT || 5000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'mentormatch',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-very-secure-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  externalApi: {
    baseUrl: process.env.EXTERNAL_API_URL || 'http://localhost:8000',
  },
}; 