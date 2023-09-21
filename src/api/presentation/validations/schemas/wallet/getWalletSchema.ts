import Joi from 'joi'

export const getWalletSchema = Joi.object({
  walletID: Joi.string().min(24).max(24).required(),
})
