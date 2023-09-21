import { RouteExpressAdapter } from '@bootstrap/adapters'
import {
  makeCreateWalletController,
  makeGetAllWalletsController,
  makeGetWalletController,
} from '@bootstrap/factories/controllers/wallets'
import { Request, Response, Router } from 'express'

const route = Router()

route.get('/:walletID', new RouteExpressAdapter(makeGetWalletController()).adapt)

route.post('/', new RouteExpressAdapter(makeCreateWalletController()).adapt)

route.get('/', new RouteExpressAdapter(makeGetAllWalletsController()).adapt)

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
