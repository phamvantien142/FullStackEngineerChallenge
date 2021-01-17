import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { IUser } from '../models/User'

export interface IRequest extends Request {
  user: IUser
}

type IMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<any> | any

const isPromise = (maybePromise: any) => !!maybePromise
	&& (typeof maybePromise === 'object' || typeof maybePromise === 'function')
    && typeof maybePromise.then === 'function'

// This is a wrapper of middleware, response an server error if there is any failure inside the callback
export const handleMiddleware = (middleware: IMiddleware) => (
    req: Request, res: Response, next: NextFunction
) => {
	let maybePromise
	try {
		maybePromise = middleware(req, res, next)
	} catch (err) {
		console.log(err)
        res.status(500).json({
            error: 'Something went wrong'
        })
	}
	if (isPromise(maybePromise)) return (async () => {
		try {
			await maybePromise
		} catch (e) {
			console.log(e)
            res.status(500).json({
                error: 'Something went wrong'
            })
		}
	})()
}

export const combineMiddlewares = (
	...middlewares: Array<IMiddleware>
) => {
    const first = middlewares.length ? middlewares[0] : undefined
    if (middlewares.length) middlewares.shift()
	return (req: Request, res: Response, next: NextFunction) => first
		? (first as IMiddleware)(req, res, (err?: any) => err
			? next(err)
			: combineMiddlewares(...middlewares)(req, res, next))
		: next()
}

export const validationResultMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(500).json({ error: errors.array()[0].msg })
    }
    next()
}