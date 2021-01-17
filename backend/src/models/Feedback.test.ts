import { FeedbackStars, FeedbackStatus, UserType } from '../helpers/constants'
import { mongooseConnect, mongooseDisconnect } from '../helpers/mongooseUtil'
import Feedback from './Feedback'
import Review from './Review'
import User from './User'

describe('Feedback model test', () => {
    beforeAll(mongooseConnect)
    afterAll(mongooseDisconnect)

    let review: any | undefined
    let reviewee: any | undefined
    let reviewer: any | undefined
    let feedbackSample = {}
    beforeEach(async () => {
        reviewee = await User.create({
            userType: UserType.user,
            email: 'reviewee@gmail.com',
            password: 'reviewee',
            firstName: 'reviewee',
            lastName: '1'
        })
        reviewer = await User.create({
            userType: UserType.user,
            email: 'reviewer@gmail.com',
            password: 'reviewer',
            firstName: 'reviewer',
            lastName: '1'
        })
        review = await Review.create({
            title: 'review 1',
            reviewee: reviewee._id,
            totalStars: 0,
            totalFeedbacks: 0
        })
        feedbackSample = {
            reviewer: reviewer._id,
            review: review._id,
            status: FeedbackStatus.completed,
            stars: FeedbackStars.highlyEffective,
            comment: 'Good job'
        }
    })
    afterEach(async () => {
        await review!.remove()
        await reviewee!.remove()
        await reviewer!.remove()
    })
    test('create successfully', async () => {
        const feedback = await Feedback.create(feedbackSample)
        expect(feedback.toJSON()).toMatchObject(feedbackSample)
        await feedback.remove()
    })
    test('check required fields', async () => {
        for (const requiredField of ['reviewer', 'review', 'status']) {
            const obj: any = {...feedbackSample}
            delete obj[requiredField]
            try {
                await Feedback.create(obj)
                throw 'ok'
            } catch (e) {
                expect(e.name).toBe('ValidationError')
            }
        }
    })
    test('invalid status', async () => {
        for (const invalidValue of [0, 'aaa']) {
            try {
                await Feedback.create({
                    ...feedbackSample,
                    status: invalidValue,
                })
                throw 'ok'
            } catch (e) {
                expect(e.name).toBe('ValidationError')
            }
        }
    })
    test('invalid stars', async () => {
        for (const invalidValue of [0, 6, 1.1]) {
            try {
                await Feedback.create({
                    ...feedbackSample,
                    stars: invalidValue,
                })
                throw 'ok'
            } catch (e) {
                expect(e.name).toBe('ValidationError')
            }
        }
    })
})