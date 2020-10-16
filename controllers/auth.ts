import express, { Request, NextFunction } from 'express'
import * as authService from './../services/auth'

// models
import { IBaseResponse, TypedResponse } from '../models/http/response'
import { AuthResponse } from './../models/http/response'

const router = express.Router()

const authenticate = (req: Request, res: TypedResponse<AuthResponse | IBaseResponse>, next: NextFunction) => {
  authService.authenticate(req.body)
    .then(user => user
      ? res.json({ success: true, ...user })
      : res.status(401).json({ success: false, message: 'Incorrect credentials provided' }))
    .catch(err => next(err))
}

const register = (req: Request, res: TypedResponse<IBaseResponse>, next: NextFunction) => {
  authService.register(req.body)
    .then(userName => res.json({ success: true, message: `Successfully registered ${userName}` }))
    .catch(err => next(err))
}

// routes
router.post('/authenticate', authenticate)
router.post('/register', register)

export default router