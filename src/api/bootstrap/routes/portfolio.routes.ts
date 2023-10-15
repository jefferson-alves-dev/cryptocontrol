import { RouteExpressAdapter } from '@bootstrap/adapters'
import { makeGetByWalletPortfolioController } from '@bootstrap/factories/controllers/portfolio'
import { Router } from 'express'

const route = Router()

route.get('/getByWallet', new RouteExpressAdapter(makeGetByWalletPortfolioController()).adapt)

export default route
