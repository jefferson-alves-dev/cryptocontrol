import { authMiddleware } from '@bootstrap/middlewares'
import { Router } from 'express'

import authRoutes from './auth.routes'
import contributionsRoutes from './contributions.routes'
import cryptosRoutes from './cryptos.routes'
import fiatCurrenciesRoutes from './fiatCurrencies.routes'
import portfolioRoutes from './portfolio.routes'
import usersRoutes from './users.routes'
import walletsRoutes from './wallets.routes'
import withdrawalsRoutes from './withdrawals.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/contributions', authMiddleware, contributionsRoutes)
router.use('/wallets', authMiddleware, walletsRoutes)
router.use('/withdrawals', authMiddleware, withdrawalsRoutes)
router.use('/cryptos', authMiddleware, cryptosRoutes)
router.use('/fiatCurrencies', authMiddleware, fiatCurrenciesRoutes)
router.use('/portfolio', authMiddleware, portfolioRoutes)

export default router
