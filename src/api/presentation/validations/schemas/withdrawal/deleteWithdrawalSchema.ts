import Joi from 'joi'

export const deleteWithdrawalSchema = Joi.object({
  withdrawalID: Joi.string().min(24).max(24).required(),
})
