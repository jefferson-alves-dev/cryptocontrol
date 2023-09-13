import { Request, Response, Router } from 'express'

const route = Router()

route.post('/signup', async (req: Request, res: Response) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ message: 'auth name is required' })
  }
  return res.status(201).json({ message: name, verbal: 'post' })
})

route.post('/login', async (req: Request, res: Response) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ message: 'login name is required' })
  }
  return res.status(201).json({ message: name, verbal: 'post' })
})

route.post('/logout', async (req: Request, res: Response) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ message: 'logout name is required' })
  }
  return res.status(201).json({ message: name, verbal: 'post' })
})

export default route
