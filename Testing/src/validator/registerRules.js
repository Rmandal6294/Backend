import { body } from 'express-validator';

const registerRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 5 }).withMessage('Name must be at least 5 characters long')
        .isLength({ max: 20 }).withMessage('Name must be less than 20 characters long'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number'),
]

export default registerRules;