import {Router} from 'express'
import {
    postNewUser, putEditUser, deleteUser, getUser,
    postNewReview, putEditReview, getReviews, postLogin, postRegister, postAssignReview, getUsers
} from '../controllers/adminControllers'

const app = Router({mergeParams: true})

// Login API
app.post('/login', postLogin)
app.post('/register', postRegister)

// User API
app.post('/user', postNewUser)
app.put('/user/:id', putEditUser)
app.delete('/user/:id', deleteUser)
app.get('/user/:id', getUser)
app.get('/users', getUsers)

// Performance review API
app.post('/review', postNewReview)
app.put('/review/:id', putEditReview)
app.get('/reviews', getReviews)

// Assign feedback
app.post('/review/:id/assign', postAssignReview)

export default app