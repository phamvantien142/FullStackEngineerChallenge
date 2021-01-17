import { mongooseConnect, mongooseDisconnect } from '../helpers/mongooseUtil'
import User from './User'
import { UserType } from '../helpers/constants'
import {v4 as uuidv4} from 'uuid'

describe('User model test', () => {
    beforeAll(mongooseConnect)
    afterAll(mongooseDisconnect)
    let userSample: any | undefined
    beforeEach(() => {
        userSample = {
            userType: UserType.admin,
            email: `${uuidv4()}@gmail.com`,
            password: '123456',
            firstName: 'first',
            lastName: 'last'
        }
    })
    test('create successfully', async () => {
        const user = await User.create(userSample)
        expect(user.toJSON()).toMatchObject(userSample)
        await user.remove()
    })
    test('check required fields', async () => {
        for (const requiredField of ['userType', 'email', 'password', 'firstName', 'lastName']) {
            const obj: any = {...userSample}
            delete obj[requiredField]
            try {
                await User.create(obj)
                throw 'ok'
            } catch (e) {
                expect(e.name).toBe('ValidationError')
            }
        }
    })
    test('check the unique of email and userType', async () => {
        const admin = await User.create(userSample)
        const user = await User.create({...userSample, userType: UserType.user})
        try {
            await User.create({
                userType: UserType.admin,
                email: userSample!.email,
                password: 'abcxyz',
                firstName: 'hello',
                lastName: 'world'
            })
            throw 'ok'
        } catch (e) {
            expect(e.name).toBe('MongoError')
        }
        await user.remove()
        await admin.remove()
    })
    test('invalid userType', async () => {
        try {
            await User.create({
                ...userSample,
                userType: 'invalid',
            })
        } catch (e) {
            expect(e.name).toBe('ValidationError')
        }
    })
})