import mongoose, {Document} from 'mongoose'
import { getMongooseConnection } from '../helpers/mongooseUtil'
import { IUser } from './User'

const rawReviewSchema = {
    title: {
        type: String,
        required: true,
    },
    reviewee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    totalStars: {
        type: Number,
        required: true,
    },
    totalFeedbacks: {
        type: Number,
        required: true
    }
}

const userSchema = new mongoose.Schema(rawReviewSchema, {timestamps: true})
userSchema.index([{createdAt: 1}])

export interface IReview {
    _id: string
    reviewee: IUser
    totalStars: number
    totalFeedbacks: number
    createdAt: Date
    updatedAt: Date
}

export default getMongooseConnection().model('Review', userSchema)
