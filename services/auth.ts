import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from './../config.json'
import db from './../helpers/db'

// models
import { IUser } from '../models/db/user'
import { AuthRequest, RegisterRequest, GetUserByIdRequest } from '../models/http/request'

export const authenticate = async ({ username, password }: AuthRequest) => {
  const user = await db.User.findOne({ username }).lean<IUser>()

  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user
    const token = jwt.sign({ sub: user._id }, config.secret)

    return {
      ...userWithoutHash,
      token
    }
  }
}

export const register = async ({ username, email, password }: RegisterRequest) => {
  const existing = await db.User.findOne({ username })

  if (existing) {
    throw `Username ${username} is already taken`
  }

  const hash = bcrypt.hashSync(password, 10)
  const user = new db.User({ username, email, hash })

  await user.save()

  return username
}

export const getById = async ({ id }: GetUserByIdRequest) => {
  const user = await db.User.findById(id).lean<IUser>()

  if (user) {
    const { hash, ...userWithoutHash } = user

    return userWithoutHash
  }
}