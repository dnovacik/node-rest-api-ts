import { NextFunction, Response, Request } from 'express'

export interface RouteRequest {
  req: Request
  res: Response
  next: NextFunction
}

export interface AuthRequest {
  username: string
  password: string
}

export interface RegisterRequest extends AuthRequest {
  email: string
}

export interface GetUserByIdRequest {
  id: string
}