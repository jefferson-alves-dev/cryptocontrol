import { RouteExpressAdapter } from '@bootstrap/adapters'
import {
  makeGetManyContributionController,
  makeGetOneContributionController,
} from '@bootstrap/factories/controllers/cryptos'
import { Router } from 'express'

const route = Router()

route.get('/:symbol', new RouteExpressAdapter(makeGetOneContributionController()).adapt)

route.get('/', new RouteExpressAdapter(makeGetManyContributionController()).adapt)

export default route
