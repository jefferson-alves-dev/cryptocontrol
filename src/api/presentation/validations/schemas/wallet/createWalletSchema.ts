import Joi from 'joi'

export const createWalletSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
})
