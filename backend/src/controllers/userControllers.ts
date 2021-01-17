import { Response, Request } from 'express'
import { handleMiddleware, combineMiddlewares, IRequest } from '../helpers/expressUtil'
import User from '../models/User'
import { authenticateToken, generateAccessToken } from '../helpers/jwt'
import { comparePassword } from '../helpers/utils'
import { FeedbackStatus, REVIEW_PAGE_SIZE, UserType } from '../helpers/constants'
import Feedback from '../models/Feedback'
import Review, { IReview } from '../models/Review'
import { postFeedbackValidation, postLoginValidation } from '../validations/userValidations'

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

export const getReviews = combineMiddlewares(
    authenticateToken(UserType.user),
    handleMiddleware(async (req: Request, res: Response) => {
        const {user} = (req as IRequest)
        const pageIndex = parseInt(req.params.pageIndex) || 0
        const total = await Feedback.countDocuments({reviewer: user._id}).exec()
        const feedbacks = await Feedback
            .find(
                {reviewer: user._id},
                null,
                {
                    limit: REVIEW_PAGE_SIZE,
                    skip: pageIndex * REVIEW_PAGE_SIZE,
                    sort: {createdAt: -1}
                }
            )
            .populate('review')
            .exec()
        res.status(200).json({
            reviews: feedbacks.map(({review}: {review: IReview}) => review),
            total
        })
    })
)

export const postReviewFeedback = combineMiddlewares(
    authenticateToken(UserType.user),
    ...postFeedbackValidation,
    handleMiddleware(async (req: Request, res: Response) => {
        const {user} = (req as IRequest)
        const {stars, comment} = req.body
        const feedback = await Feedback.findOne({
            _id: req.params.id,
            reviewer: user._id
        }).exec()
        if (!feedback) return res.status(500).json({error: 'Feedback not found'})
        feedback.stars = parseInt(stars)
        feedback.comment = comment
        feedback.status = FeedbackStatus.completed
        await feedback.save()
        await Review.findByIdAndUpdate(
            feedback.review,
            {
                $inc: {
                    totalFeedbacks: 1,
                    totalStars: feedback.stars
                }
            }
        ).exec()
        res.status(200).json(true)
    })
)