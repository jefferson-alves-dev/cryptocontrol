import { RouteExpressAdapter } from '@bootstrap/adapters'
import {
  makeCreateContributionController,
  makeGetAllContributionController,
  makeGetByIdContributionController,
} from '@bootstrap/factories/controllers/contributions'
import { Request, Response, Router } from 'express'

const route = Router()

route.get('/:contributionID', new RouteExpressAdapter(makeGetByIdContributionController()).adapt)

route.post('/', new RouteExpressAdapter(makeCreateContributionController()).adapt)

route.get('/', new RouteExpressAdapter(makeGetAllContributionController()).adapt)

route.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'deposits id is required' })
  }
  return res.status(201).json({ message: id, verbal: 'put' })
})

route.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'deposits id is required' })
  }
  return res.status(201).json({ message: id, verbal: 'deleted' })
})

export default route
