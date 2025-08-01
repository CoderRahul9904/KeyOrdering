// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, IUser } from '../models/userModel';

const SALT_ROUNDS = 12;
// Explicitly type your secret and options for jwt.sign()
const JWT_SECRET: Secret = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

interface SignupBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const signup = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role: 'user',
      createdAt: new Date(),
    } as Partial<IUser>);

    // Explicitly type sign options
    const signOptions: SignOptions = { expiresIn: JWT_EXPIRES_IN } as unknown as SignOptions

    const token = jwt.sign(
      { sub: newUser._id, role: newUser.role },
      JWT_SECRET,
      signOptions 
    );

    res.status(201).json({
      message: 'User created.',
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const signOptions: SignOptions = { expiresIn: JWT_EXPIRES_IN } as unknown as SignOptions

    const token = jwt.sign(
      { sub: user._id, role: user.role },
      JWT_SECRET,
      signOptions
    );

    res.status(200).json({
      message: 'Login successful.',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.role === 'admin',
        },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};
