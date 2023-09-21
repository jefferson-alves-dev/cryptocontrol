import CONFIG from '@config/index'
import { UnauthorizedError } from '@presentation/errors'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload, TokenExpiredError, VerifyErrors } from 'jsonwebtoken'
export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const token = request?.headers?.authorization
  if (!token) {
    return response
      .status(401)
      .json({ error: new UnauthorizedError('Access denied. No authentication token provided.').message })
  }
  try {
    const tokenData: JwtPayload | string = jwt.verify(token, CONFIG.TOKEN_SECRET)
    if (typeof tokenData !== 'string') {
      request.userData = request.userData || {}
      request.userData.userID = tokenData.userID
      next()
    }
  } catch (error: unknown) {
    const e = error as VerifyErrors

    if (e instanceof TokenExpiredError) {
      return response.status(401).json({ error: new UnauthorizedError('Access denied. Token expired.').message })
    }

    return response.status(401).json({ error: new UnauthorizedError('Access denied. Invalid token.').message })
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    userData: {
      [key: string]: any
    }
  }
}
