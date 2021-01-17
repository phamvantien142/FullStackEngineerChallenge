import {Router} from 'express'
import { getReviews, postLogin, postReviewFeedback } from '../controllers/userControllers'

const app = Router({mergeParams: true})

// Login API
app.post('/login', postLogin)

// Performance review API
app.get('/reviews', getReviews)
app.post('/review/:id/feedback', postReviewFeedback)

export default app