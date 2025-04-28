import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

import { UserModel } from '../models/user.model';
import { config } from '../config/config';

const SALT_ROUNDS = 10;

/** Generate a signed JWT */
function signToken(userId: string, email: string) {
  const secret: Secret = config.jwt.secret;
  const options: SignOptions = { expiresIn: config.jwt.expiresIn };
  if (!secret || secret === 'your-very-secure-secret-key') {
    throw new Error('JWT_SECRET is not set! Please set it in your .env file for production.');
  }
  // The third argument is the options object, where expiresIn is set
  return jwt.sign(
    { sub: userId, email },
    secret,
    options
  );
}

/** POST /api/auth/signup  – create a new account */
async function signup(req: Request, res: Response) {
  const { email, password, role = 'mentee', firstName, lastName, phone, lssId, heardAbout, city = 'Toronto' } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    /* duplicate check */
    const existing = await UserModel.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'A user with this email already exists. Please log in or use a different email.' });
    }

    /* hash + store */
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await UserModel.createUser(email, hashed, role);

    // Create user profile with extra fields
    await UserModel.createUserProfile(
      user.id,
      firstName || '',
      lastName || '',
      city,
      undefined, // profilePicture
      undefined, // bio
      phone || '',
      lssId || '',
      heardAbout || ''
    );

    const token = signToken(user.id, user.email);
    delete (user as any).password;          // never send the hash back

    return res.status(201).json({ token, user });
  } catch (err) {
    console.error('Signup failed:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/** POST /api/auth/login */
async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await UserModel.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user.id, user.email);
    delete (user as any).password;

    return res.json({ token, user });
  } catch (err) {
    console.error('Login failed:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/** POST /api/auth/logout – client just discards its token */
function logout(_req: Request, res: Response) {
  return res.json({ message: 'Logged out' });
}

/** GET /api/auth/me – needs auth.middleware to have set req.user */
async function getCurrentUser(req: Request, res: Response) {
  try {
    const payload = (req as any).user as { sub: string } | undefined;
    if (!payload?.sub) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    const user = await UserModel.findUserById(payload.sub);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    delete (user as any).password;
    return res.json(user);
  } catch (err) {
    console.error('getCurrentUser failed:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const authController = {
  signup,
  login,
  logout,
  getCurrentUser,
};