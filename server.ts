import express from 'express'
import bodyParser from 'body-parser'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import errorHandler from './helpers/errorHandler'

// controllers
import authController from './controllers/auth'

// models
import { RouteRequest } from './models/http/request'

const app = express()

const corsOptions = {
  optionsSuccessStatus: 200
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '10kb' }))
app.use(cors(corsOptions))
app.use(limiter)

// routes
app.use('/user', (req, res, next): RouteRequest => authController(req, res, next))


// global error handler
app.use(errorHandler)

app.listen(process.env.PORT || 4040, () => {
  console.log(`server started, listening on port ${process.env.PORT || 4040}`)
})