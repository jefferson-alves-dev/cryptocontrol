import dotenv from 'dotenv'
dotenv.config()

import { RouteExpressAdapter } from '@bootstrap/adapters'
import { makeLoginController, makeSignupController } from '@bootstrap/factories/controllers/auth'
import { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'

const route = Router()

route.post('/signup', new RouteExpressAdapter(makeSignupController()).adapt)

route.post('/login', new RouteExpressAdapter(makeLoginController()).adapt)

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
