import mongoose, {Document} from 'mongoose'
import { FeedbackStars, FeedbackStatus } from '../helpers/constants'
import { getMongooseConnection } from '../helpers/mongooseUtil'
import { IReview } from './Review'
import { IUser } from './User'

const rawFeedbackSchema = {
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true,
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(FeedbackStatus),
        required: true,
    },
    stars: {
        type: Number,
        enum: Object.values(FeedbackStars),
    },
    comment: {
        type: String
    }
}

const userSchema = new mongoose.Schema(rawFeedbackSchema, {timestamps: true})

export interface IFeedback {
    _id: string
    review: IReview
    reviewer: IUser
    stars: number
    comment: string
    createdAt: Date
    updatedAt: Date
}

export default getMongooseConnection().model('Feedback', userSchema)
