import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import adminRoutes from './routes/admin'
import userRoutes from './routes/user'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

// parse application/json
app.use(bodyParser.json())
app.use(cors())

app.use(userRoutes)
app.use('/admin', adminRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`App listening on PORT ${port}`)
})
