import dotenv from 'dotenv'
dotenv.config()

import { RouteExpressAdapter } from '@bootstrap/adapters'
import { makeSignupController } from '@bootstrap/factories/controllers/auth'
import { loginValidationSchema } from '@presentation/validations/schemas/auth'
import bcrypt from 'bcrypt'
import { Request, Response, Router } from 'express'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import { MongoClient } from 'mongodb'

const route = Router()

route.post('/signup', new RouteExpressAdapter(makeSignupController()).adapt)

route.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body

  // Joi Schema validation
  try {
    await loginValidationSchema.validateAsync({ email, password })
  } catch (e: unknown) {
    const error = e as Joi.ValidationError
    return res.status(400).json({ message: 'Validation error', error: error.details[0]?.message })
  }

  // Verify if user exists
  const uri = process.env.DB_URI
  if (!uri) {
    console.log('DB_URI is not set')
    return res.status(500).json({ message: 'Internal server error' })
  }
  const mongo = new MongoClient(uri)
  try {
    const collection = mongo.db().collection('users')
    const userExists = await collection.findOne({ email })
    if (!userExists) {
      return res.status(400).json({ message: 'email or password is incorrect' })
    }
    if (!userExists.isActive) {
      return res.status(400).json({ message: 'email or password is incorrect' })
    }
    const passwordMatch = await bcrypt.compare(password + process.env.HASH_PASS_SECRET, userExists.password)
    if (!passwordMatch) {
      return res.status(400).json({ message: 'email or password is incorrect' })
    }
    if (!process.env.JWT_SECRET) {
      console.log('JWT_SECRET is not set')
      return res.status(500).json({ message: 'Internal server error' })
    }
    const token = jwt.sign({ userId: userExists._id.toHexString() }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    })
    return res.status(200).json({ token })
  } catch (e: unknown) {
    console.log(e)
    return res.status(500).json({ message: 'Internal server error' })
  } finally {
    await mongo.close()
    console.log('MongoDB connection closed')
  }
})

route.post('/logout', async (req: Request, res: Response) => {
  try {
    if (!req.headers['authorization']) {
      return res.status(400).json({ message: 'token is required' })
    }

    const token = req.headers['authorization']
    if (!token) {
      return res.status(400).json({ message: 'token is required' })
    }

    if (!process.env.JWT_SECRET) {
      console.log('JWT_SECRET is not set')
      return res.status(500).json({ message: 'Internal server error' })
    }

    const userId = jwt.verify(token, process.env.JWT_SECRET) as { userId: string }
    if (!userId) {
      return res.status(400).json({ message: 'token is invalid' })
    }

    return res.status(200).json({ message: `The userId ${userId.userId} has been logged out` })
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid token' })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
})

export default route
