import { UserType } from '../helpers/constants'
import { mongooseConnect, mongooseDisconnect } from '../helpers/mongooseUtil'
import Review from './Review'
import User from './User'
import {v4 as uuidv4} from 'uuid'

describe('Feedback model test', () => {
    beforeAll(mongooseConnect)
    afterAll(mongooseDisconnect)

    let reviewee: any | undefined
    let reviewSample = {}
    beforeEach(async () => {
        reviewee = await User.create({
            userType: UserType.user,
            email: `${uuidv4()}@gmail.com`,
            password: 'reviewee',
            firstName: 'reviewee',
            lastName: '1'
        })
        reviewSample = {
            title: 'title',
            reviewee: reviewee._id,
            totalStars: 0,
            totalFeedbacks: 0,
        }
    })
    afterEach(async () => {
        await reviewee!.remove()
    })
    test('create successfully', async () => {
        const review = await Review.create(reviewSample)
        expect(review.toJSON()).toMatchObject(reviewSample)
        await review.remove()
    })
    test('check required fields', async () => {
        for (const requiredField of ['reviewee', 'title', 'totalStars', 'totalFeedbacks']) {
            const obj: any = {...reviewSample}
            delete obj[requiredField]
            try {
                await Review.create(obj)
                throw 'ok'
            } catch (e) {
                expect(e.name).toBe('ValidationError')
            }
        }
    })
})