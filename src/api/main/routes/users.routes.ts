import { Request, Response, Router } from 'express'

const route = Router()

route.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'User id is required' })
  }
  return res.status(201).json({ message: id, verbal: 'get' })
})

route.post('/', async (req: Request, res: Response) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ message: 'User name is required' })
  }
  return res.status(201).json({ message: name, verbal: 'post' })
})

route.get('/', async (req: Request, res: Response) => {
  return res.status(201).json({ message: ['User 1', 'User 2', 'User 3'], verbal: 'getAll' })
})

route.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'User id is required' })
  }
  return res.status(201).json({ message: id, verbal: 'put' })
})

route.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'User id is required' })
  }
  return res.status(201).json({ message: id, verbal: 'deleted' })
})

export default route
