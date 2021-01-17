import { Request, Response } from 'express'
import { FeedbackStatus, REVIEW_PAGE_SIZE, UserType } from '../helpers/constants'
import { combineMiddlewares, handleMiddleware } from '../helpers/expressUtil'
import { authenticateToken, generateAccessToken } from '../helpers/jwt'
import { comparePassword, hashPassword } from '../helpers/utils'
import Feedback from '../models/Feedback'
import Review from '../models/Review'
import User from '../models/User'
import {
    postLoginValidation, postNewReviewValidation,
    userFieldsValidation, putEditReviewValidation, registerFieldsValidation
} from '../validations/adminValidations'

/**
 * POST /admin/login
 * Login admin api
 */
export const postLogin = combineMiddlewares(
    ...postLoginValidation,
    handleMiddleware(async (req: Request, res: Response) => {
        const {email, password} = req.body
        const user = await User.findOne({
            userType: UserType.admin,
            email
        }).exec()
        if (!user) return res.status(500).json({error: 'User not found'})
        if (
            user && !(await comparePassword(user.password, password))
        ) return res.status(500).json({error: 'Wrong username/password'})

        res.status(200).json({
            token: generateAccessToken(user.email)
        })
    })
)
/**
 * POST /admin/register
 * Register an admin account.
 */
export const postRegister = combineMiddlewares(
    ...registerFieldsValidation,
    handleMiddleware(async (req: Request, res: Response) => {
        const {email, password, confirmPassword, firstName, lastName} = req.body
        if (
            password !== confirmPassword
        ) return res.status(500).json({error: 'Re-password is not match'})
        const user = await User.findOne({
            userType: UserType.admin,
            email
        }).exec()
        if (user) return res.status(500).json({error: 'This email is already exist'})
        await User.create({
            userType: UserType.admin,
            email,
            password: await hashPassword(password),
            firstName,
            lastName,
        })
        res.status(200).json(true)
    })
)
/**
 * POST /admin/user
 * New an user account
 */
export const postNewUser = combineMiddlewares(
    authenticateToken(UserType.admin),
    ...registerFieldsValidation,
    handleMiddleware(async (req: Request, res: Response) => {
        const {email, password, confirmPassword, firstName, lastName} = req.body
        if (
            password !== confirmPassword
        ) return res.status(500).json({error: 'Re-password is not match'})
        const user = await User.findOne({
            userType: UserType.user,
            email
        }).exec()
        if (user) return res.status(500).json({error: 'This email is already exist'})
        await User.create({
            userType: UserType.user,
            email,
            password: await hashPassword(password),
            firstName,
            lastName,
        })
        res.status(200).json(true)
    })
)
/**
 * PUT /admin/user/:id
 * Update user information.
 */
export const putEditUser = combineMiddlewares(
    authenticateToken(UserType.admin),
    ...userFieldsValidation,
    handleMiddleware(async (req: Request, res: Response) => {
        const {email, password, firstName, lastName} = req.body
        const user = await User.findOne({
            _id: req.params.id,
            userType: UserType.user,
        }).exec()
        if (!user) return res.status(500).json({error: 'User not found'})
        user.email = email
        user.password = await hashPassword(password)
        user.firstName = firstName
        user.lastName = lastName
        await user.save()
        res.status(200).json(true)
    })
)
/**
 * DELETE /admin/user/:id
 * Remove an user
 */
export const deleteUser = combineMiddlewares(
    authenticateToken(UserType.admin),
    handleMiddleware(async (req: Request, res: Response) => {
        const user = await User.findOne({
            _id: req.params.id,
            userType: UserType.user,
        }).exec()
        if (!user) return res.status(500).json({error: 'User not found'})
        await user.remove()
        res.status(200).json(true)
    })
)
/**
 * GET /admin/user/:id
 * Get user information.
 */
export const getUser = combineMiddlewares(
    authenticateToken(UserType.admin),
    handleMiddleware(async (req: Request, res: Response) => {
        const user = await User.findOne({
            _id: req.params.id,
            userType: UserType.user,
        }).exec()
        if (!user) return res.status(500).json({error: 'User not found'})
        const {email, firstName, lastName, createdAt} = user
        res.status(200).json({email, firstName, lastName, createdAt})
    })
)
/**
 * GET /admin/users
 * Get a list of user information with pagination.
 *    Params: pageIndex
 */
export const getUsers = combineMiddlewares(
    authenticateToken(UserType.user),
    handleMiddleware(async (req: Request, res: Response) => {
        const pageIndex = parseInt(req.params.pageIndex) || 0
        const total = await User.countDocuments({userType: UserType.user}).exec()
        const users = await User
            .find(
                {userType: UserType.user},
                'email firstName lastName',
                {
                    limit: REVIEW_PAGE_SIZE,
                    skip: pageIndex * REVIEW_PAGE_SIZE,
                    sort: {createdAt: -1}
                }
            )
            .exec()
        res.status(200).json({
            users: users.map((user: any) => user.toJSON()),
            total
        })
    })
)
/**
 * POST /admin/review
 * New a review
 */
export const postNewReview = combineMiddlewares(
    authenticateToken(UserType.admin),
    ...postNewReviewValidation,
    handleMiddleware(async (req: Request, res: Response) => {
        const {title, email} = req.body
        const user = await User.findOne({
            email,
            userType: UserType.user,
        }).exec()
        if (!user) return res.status(500).json({error: 'User not found'})
        await Review.create({
            title,
            reviewee: user._id,
            totalStars: 0,
            totalFeedbacks: 0
        })
        res.status(200).json(true)
    })
)
/**
 * PUT /admin/review/:id
 * Update review information
 */
export const putEditReview = combineMiddlewares(
    authenticateToken(UserType.admin),
    ...putEditReviewValidation,
    handleMiddleware(async (req: Request, res: Response) => {
        const {title} = req.body
        const review = await Review.findById(req.params.id).exec()
        if (!review) return res.status(500).json({error: 'Review not found'})
        review.title = title
        await review.save()
        res.status(200).json(true)
    })
)
/**
 * GET /admin/users
 * Get a list of review information with pagination.
 *    Params: pageIndex
 */
export const getReviews = combineMiddlewares(
    authenticateToken(UserType.user),
    handleMiddleware(async (req: Request, res: Response) => {
        const pageIndex = parseInt(req.params.pageIndex) || 0
        const total = await Review.countDocuments({}).exec()
        const reviews = await Review
            .find(
                {},
                null,
                {
                    limit: REVIEW_PAGE_SIZE,
                    skip: pageIndex * REVIEW_PAGE_SIZE,
                    sort: {createdAt: -1}
                }
            )
            .populate('reviewee', 'email firstName lastName')
            .exec()
        res.status(200).json({
            reviews: reviews.map((review: any) => review.toJSON()),
            total
        })
    })
)
/**
 * POST /admin/review/:id/assign
 * Assign a reviewer to join a specific review
 */
export const postAssignReview = combineMiddlewares(
    authenticateToken(UserType.admin),
    ...postNewReviewValidation,
    handleMiddleware(async (req: Request, res: Response) => {
        const review = await Review.findById(req.params.id).exec()
        if (!review) return res.status(500).json({error: 'Review not found'})
        const {email} = req.body
        const user = await User.findOne({
            email,
            userType: UserType.user,
        }).exec()
        if (!user) return res.status(500).json({error: 'User not found'})
        const feedback = await Feedback.findOne({
            review: review._id,
            reviewer: user._id,
        }).exec()
        if (feedback) return res.status(500).json({error: 'This employee is already assigned'})
        await Feedback.create({
            review: review._id,
            reviewer: user._id,
            status: FeedbackStatus.assigned
        })
        res.status(200).json(true)
    })
)