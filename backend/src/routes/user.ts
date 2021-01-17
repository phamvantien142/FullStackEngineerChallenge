import {Router} from 'express'
import { getFeedbacks, postLogin, putFeedback } from '../controllers/userControllers'

const app = Router({mergeParams: true})

// Login API
app.post('/login', postLogin)

// Performance review API
app.get('/feedbacks', getFeedbacks)
app.post('/feedback/:id', putFeedback)

export default app