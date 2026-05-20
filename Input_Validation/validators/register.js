import {body} from "express-validator"

const registerRules = [
    body('name')
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({min : 5}).withMessage("Name required minimum length of 5 characters")
        .isLength({max : 20}).withMessage("Name Can be Under the 20 characters"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Valid email required")
        .normalizeEmail(), // its do the all characters into lowercase

    body("age")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isInt().withMessage("Age should be Integer"),

    body("password")
        .trim()
        .notEmpty().withMessage("password is required")
        .isLength({min: 8}).withMessage("Password must be 8 character")
        .matches(/[A-Z]/).withMessage("Need At least 1 uppercase letter")
        .matches(/[0-9]/).withMessage("Need at least 1 number."),
]

export default registerRules