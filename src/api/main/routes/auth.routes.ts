import { loginValidationSchema, signupValidationSchema } from '@main/valitadions/schemas/auth'
import { Request, Response, Router } from 'express'
import Joi from 'joi'

const route = Router()

route.post('/signup', async (req: Request, res: Response) => {
  const { name, email, password, passwordConfirmation } = req.body

  try {
    await signupValidationSchema.validateAsync({ name, email, password, passwordConfirmation })
    return res.status(201).json({ message: 'The user was created successfully' })
  } catch (e: unknown) {
    const error = e as Joi.ValidationError
    return res.status(400).json({ message: 'Validation error', error: error.details[0]?.message })
  }
})

route.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    await loginValidationSchema.validateAsync({ email, password })
    return res.status(201).json({ message: 'Login successfully' })
  } catch (e: unknown) {
    const error = e as Joi.ValidationError
    return res.status(400).json({ message: 'Validation error', error: error.details[0]?.message })
  }
})

route.post('/logout', async (req: Request, res: Response) => {
  const { token } = req.headers
  if (!token) {
    return res.status(400).json({ message: 'token is required' })
  }
  return res.status(200).json({ message: `Token = ${token}`, verbal: 'post' })
})

export default route
