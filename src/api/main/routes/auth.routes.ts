/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
import { loginValidationSchema, signupValidationSchema } from '@main/valitadions/schemas/auth'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Request, Response, Router } from 'express'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import { MongoClient, ObjectId } from 'mongodb'
dotenv.config()

const route = Router()

route.post('/signup', async (req: Request, res: Response) => {
  const { name, email, password, passwordConfirmation } = req.body

  try {
    await signupValidationSchema.validateAsync({ name, email, password, passwordConfirmation })
  } catch (e: unknown) {
    const error = e as Joi.ValidationError
    return res.status(400).json({ message: 'Validation error', error: error.details[0]?.message })
  }

  const uri = process.env.DB_URI
  if (!uri) {
    console.log('DB_URI is not set')
    return res.status(500).json({ message: 'Internal server error' })
  }
  const mongo = new MongoClient(uri)

  try {
    const client = await mongo.connect()
    const collection = client.db().collection('users')
    const user = await collection.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  } finally {
    await mongo.close()
    console.log('MongoDB connection closed')
  }

  if (!process.env.SALT_HASH) {
    console.log('SALT_HASH is not set')
    return res.status(500).json({ message: 'Internal server error' })
  }

  if (!process.env.HASH_PASS_SECRET) {
    console.log('HASH_PASS_SECRET is not set')
    return res.status(500).json({ message: 'Internal server error' })
  }

  const hashedPassword = await bcrypt.hash(password + process.env.HASH_PASS_SECRET, Number(process.env.SALT_HASH))

  try {
    const client = await mongo.connect()
    const collection = client.db().collection('users')
    const result = await collection.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().getTime(),
      isActive: true,
    })
    const id = result.insertedId.toString()
    const userData = await collection.findOne({ _id: new ObjectId(id) })

    if (!userData) {
      return res.status(500).json({ message: 'Internal server error' })
    }
    const { _id, password, createdAt, isActive, ...rest } = userData
    const user = {
      id: _id.toHexString(),
      ...rest,
      createdAt: new Date(createdAt).toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }),
    }

    return res.status(201).json({ message: `The user with id = ${id} has been created`, user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error. The user could not be created.' })
  } finally {
    await mongo.close()
    console.log('MongoDB connection closed')
  }
})

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
