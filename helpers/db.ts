import config from './../config.json'
import mongoose from 'mongoose'

// models
import User from '../models/db/user'

if (process.env.MONGODB_URL || config.mongodbUrl) {
  mongoose.connect(process.env.MONGODB_URL || config.mongodbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

mongoose.Promise = global.Promise

export default {
  User: User
}