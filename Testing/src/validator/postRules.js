import {body} from 'express-validator';

export const postRules = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long')
        .isLength({ max: 100 }).withMessage('Title must be less than 100 characters long'),

    body('content')
        .trim()
        .notEmpty().withMessage('Content is required')
        .isLength({ min: 20 }).withMessage('Content must be at least 20 characters long')
]

export default postRules;