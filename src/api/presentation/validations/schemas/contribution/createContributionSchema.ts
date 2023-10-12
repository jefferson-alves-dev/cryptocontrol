import Joi from 'joi'

export const createContributionSchema = Joi.object({
  walletID: Joi.string().min(24).max(24).required(),
  purchasedCoinID: Joi.number().required(),
  purchaseCoinID: Joi.number().required(),
  purchasedCoinSymbol: Joi.string().min(2).max(8).required(),
  purchaseCoinSymbol: Joi.string().min(2).max(8).required(),
  currentPricePurchasedCoin: Joi.number().required(),
  amountPurchasedCoin: Joi.number().required(),
  contributionDate: Joi.number().required(),
})
