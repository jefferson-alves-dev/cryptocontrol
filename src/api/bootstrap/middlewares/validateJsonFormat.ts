import { NextFunction, Request, Response } from 'express'

export const validateJsonFormat = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error?.type === 'entity.parse.failed') {
    return res
      .status(400)
      .json({ error: 'The provided JSON is malformed. Please review the JSON structure and try again.' })
  }
  next()
}
