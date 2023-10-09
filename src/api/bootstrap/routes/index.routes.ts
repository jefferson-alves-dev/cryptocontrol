import { authMiddleware } from '@bootstrap/middlewares'
import { Router } from 'express'

import authRoutes from './auth.routes'
import contributionsRoutes from './contributions.routes'
import usersRoutes from './users.routes'
import walletsRoutes from './wallets.routes'
import withdrawalsRoutes from './withdrawals.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/contributions', contributionsRoutes)
router.use('/users', usersRoutes)
router.use('/wallets', authMiddleware, walletsRoutes)
router.use('/withdrawals', withdrawalsRoutes)

export default router
