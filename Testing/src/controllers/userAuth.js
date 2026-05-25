import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import AppError from '../utils/AppError.js';
import AsyncHandle from '../utils/asyncHandler.js';

export const register = AsyncHandle(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
        name, 
        email, 
        password: hashedPassword 
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
})

export const login = AsyncHandle(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError('Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError('Invalid credentials', 401);
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
})

export const logout = AsyncHandle(async (req, res) => {
    res.clearCookie('token', { httpOnly: true });
    
    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    });
});