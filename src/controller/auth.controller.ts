import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { signIn } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req);
    
    const token = signIn({ user_id: user.user_id });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'none',
    });

    // Also send token in response body for frontend storage
    res.status(201).json({ 
      message: 'User registered', 
      user: { id: user.user_id, email: user.email },
      token
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await authService.login(req);

    const token = signIn({ user_id: user.user_id });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
    });

    // Also send token in response body for frontend storage
    res.status(200).json({ 
      message: 'Login successful', 
      user: { id: user.user_id, email: user.email },
      token
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
