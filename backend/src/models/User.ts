import mongoose from 'mongoose'
import { UserType } from '../helpers/constants'
import { getMongooseConnection } from '../helpers/mongooseUtil'

const rawUserSchema = {
    userType: {
        type: String,
        required: true,
        enum: Object.values(UserType)
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
}

const userSchema = new mongoose.Schema(rawUserSchema)

userSchema.index([{email: 1}]) // index for login API
userSchema.index([{_id: 1}, {email: 1}])
userSchema.index([{createdAt: 1}])
userSchema.index({userType: 1, email: 1}, {unique: true}) // unique constraint with email and userType

export interface IUser {
    _id: string
    email: string
    password: string
    firstName: string
    lastName: string
    createdAt: Date
    updatedAt: Date
}

export default getMongooseConnection().model('User', userSchema)
