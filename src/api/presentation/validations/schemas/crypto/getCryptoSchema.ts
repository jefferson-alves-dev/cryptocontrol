import Joi from 'joi'

export const getCryptoSchema = Joi.object({
  symbol: Joi.string().min(1).max(10).required(),
})
