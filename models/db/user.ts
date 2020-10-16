import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
})

userSchema.path('email').validate((email: string) => {
  let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

  return emailRegex.test(email)
})

userSchema.set('toJSON', {
  virtuals: true
})

export interface IUser {
  _id: string
  name: string
  email: string
  hash: string
}

export interface IUserDocument extends IUser, mongoose.Document {
  _id: string
}

export default mongoose.model<IUserDocument>('user', userSchema)