import Joi from 'joi'

export const createWithdrawalSchema = Joi.object({
  walletID: Joi.string().min(24).max(24).required(),
  withdrawalCoinID: Joi.number().required(),
  withdrawalCoinSymbol: Joi.string().min(2).max(8).required(),
  currentPriceWithdrawalCoin: Joi.number().required(),
  amountWithdrawalCoin: Joi.number().required(),
  withdrawalDate: Joi.number().required(),
})
