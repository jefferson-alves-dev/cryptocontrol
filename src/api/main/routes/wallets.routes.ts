import { Request, Response, Router } from 'express'

const route = Router()

route.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'Wallet id is required' })
  }
  return res.status(201).json({ message: id, verbal: 'get' })
})

route.post('/', async (req: Request, res: Response) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ message: 'Wallet name is required' })
  }
  return res.status(201).json({ message: name, verbal: 'post' })
})

route.get('/', async (req: Request, res: Response) => {
  return res.status(201).json({ message: ['wallet 1', 'wallet 2', 'wallet 3'], verbal: 'getAll' })
})

route.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'Wallet id is required' })
  }
  return res.status(201).json({ message: id, verbal: 'put' })
})

route.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'Wallet id is required' })
  }
  return res.status(201).json({ message: id, verbal: 'deleted' })
})

export default route
