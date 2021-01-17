import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { UserType } from './constants'
import { IRequest } from './expressUtil'

export const authenticateToken = (userType: UserType) => (req: Request, res: Response, next: NextFunction) => {
    // Get the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, process.env.JWT_TOKEN_SECRET as string, async (err: any, userObj: any) => {
        if (err) return res.status(403).json({error: 'Invalid token'})
        const {username} = userObj
        const user = await User.findOne({email: username, userType}).exec()
        if (!user) return res.status(500).json({error: 'User not found'})
        ;(req as IRequest).user = user
        next()
    })
}

export const generateAccessToken = (username: string) => jwt.sign(
    {username}, process.env.JWT_TOKEN_SECRET as string, { expiresIn: '1800s' }
)
