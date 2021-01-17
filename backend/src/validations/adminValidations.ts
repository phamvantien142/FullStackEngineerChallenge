import { body, param} from 'express-validator'
import { validationResultMiddleware } from '../helpers/expressUtil'

export const postLoginValidation = [
    body('email', 'email is required').notEmpty(),
    body('email', 'email must be a valid email format').isEmail(),
    body('password', 'pasword must have at least 5 characters').isLength({ min: 5 }),
    validationResultMiddleware
]

export const userFieldsValidation = [
    body('email', 'email is required').notEmpty(),
    body('email', 'email must be a valid email format').isEmail(),
    body('password', 'pasword must have at least 5 characters').isLength({ min: 5 }),
    body('firstName', 'firstName is not empty').notEmpty(),
    body('lastName', 'lastName is not empty').notEmpty(),
    validationResultMiddleware
]
export const registerFieldsValidation = [
    body('email', 'email is required').notEmpty(),
    body('email', 'email must be a valid email format').isEmail(),
    body('password', 'pasword must have at least 5 characters').isLength({ min: 5 }),
    body('confirmPassword', 're-password must have at least 5 characters').isLength({ min: 5 }),
    body('firstName', 'firstName is not empty').notEmpty(),
    body('lastName', 'lastName is not empty').notEmpty(),
    validationResultMiddleware
]

export const postNewReviewValidation = [
    body('title', 'title is not empty').notEmpty(),
    body('email', 'email is required').notEmpty(),
    body('email', 'email must be a valid email format').isEmail(),
    validationResultMiddleware
]

export const putEditReviewValidation = [
    body('title', 'title is not empty').notEmpty(),
    validationResultMiddleware
]
