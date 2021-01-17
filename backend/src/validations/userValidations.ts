import { body, param} from 'express-validator'
import { validationResultMiddleware } from '../helpers/expressUtil'

export const postLoginValidation = [
    body('email', 'email is required').notEmpty(),
    body('email', 'email must be a valid email format').isEmail(),
    body('password', 'pasword must have at least 5 characters').isLength({ min: 5 }),
    validationResultMiddleware
]

export const putFeedbackValidation = [
    body('stars', 'stars is not a number').isNumeric(),
    body('comment', 'invalid comment').isString(),
    validationResultMiddleware,
]
