import { RouteExpressAdapter } from '@bootstrap/adapters'
import {
  makeCreateWithdrawalController,
  makeGetAllWithdrawalController,
  makeGetByIdWithdrawalController,
} from '@bootstrap/factories/controllers/withdrawals'
import { Request, Response, Router } from 'express'

const route = Router()

route.get('/:withdrawalID', new RouteExpressAdapter(makeGetByIdWithdrawalController()).adapt)

route.post('/', new RouteExpressAdapter(makeCreateWithdrawalController()).adapt)

route.get('/', new RouteExpressAdapter(makeGetAllWithdrawalController()).adapt)

route.put('/:withdrawalID', async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'withdrawals id is required' })
  }
  return res.status(201).json({ message: id, verbal: 'put' })
})

route.delete('/:withdrawalID', async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'withdrawals id is required' })
  }
  return res.status(201).json({ message: id, verbal: 'deleted' })
})

export default route
