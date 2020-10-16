  
import { NextFunction, Response, Request } from 'express'

export type TypedResponse<T> = Omit<Response, 'json' | 'status'> & { json(data: T) : TypedResponse<T> } & { status(code: number): TypedResponse <T> }

export interface AuthResponse extends IBaseResponse {
  name: string
  email: string
  token: string
}

export interface IBaseResponse {
  success: boolean
  message?: string
}