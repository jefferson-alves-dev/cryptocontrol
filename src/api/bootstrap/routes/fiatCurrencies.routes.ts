import { RouteExpressAdapter } from '@bootstrap/adapters'
import {
  makeGetManyFiatCurrenciesController,
  makeGetOneFiatCurrencyController,
} from '@bootstrap/factories/controllers/fiatCurrencies'
import { Router } from 'express'

const route = Router()

route.get('/:symbol', new RouteExpressAdapter(makeGetOneFiatCurrencyController()).adapt)

route.get('/', new RouteExpressAdapter(makeGetManyFiatCurrenciesController()).adapt)

export default route
