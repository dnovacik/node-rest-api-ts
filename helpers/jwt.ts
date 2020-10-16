import { NextFunction, Response, Request } from 'express'
import expressJwt from 'express-jwt'
import config from './../config.json'
import * as authService from './../services/auth'

const jwt = () => {
  return expressJwt({
    secret: config.secret, isRevoked
  }).unless({
    path: [
      '/user/register',
      '/user/authenticate'
    ]
  });
}

const isRevoked = async (req: Request, payload: { sub: string }, done: (err: Error, revoked?: boolean) => void) => {
  const user = await authService.getById({ id: payload.sub })

  if (!user) {
    return done(null, true)
  }

  done(null, false)
}

export default jwt