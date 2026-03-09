import mongoose from 'mongoose'
import env from './env'

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.MONGO_URI)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}
