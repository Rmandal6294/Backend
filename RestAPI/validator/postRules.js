import {body} from "express-validator"

const postRules = [
    body('title')
        .trim()
        .notEmpty().withMessage("Name is required"),

    body("content").trim()
        .notEmpty().withMessage("Email is required")
]

export default postRules