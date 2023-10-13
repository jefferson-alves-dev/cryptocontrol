import Joi from 'joi'

export const createWithdrawalSchema = Joi.object({
  walletID: Joi.string().min(24).max(24).required(),
  symbolCoinUsedForWithdrawal: Joi.string().required(),
  symbolWithdrawnCoin: Joi.string().required(),
  amountWithdrawn: Joi.number().required(),
  withdrawalBrokerFee: Joi.number().required(),
  symbolCoinUsedForPayWithdrawalBrokerFee: Joi.string().required(),
  withdrawalDate: Joi.number().required(),
})
