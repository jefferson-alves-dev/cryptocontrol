import Joi from 'joi'

export const createContributionSchema = Joi.object({
  walletID: Joi.string().min(24).max(24).required(),
  symbolCoinUsedForPurchase: Joi.string().required(),
  symbolPurchasedCoin: Joi.string().required(),
  pricePurchasedCoin: Joi.number().required(),
  totalAmountContributed: Joi.number().required(),
  amountPurchasedCoin: Joi.number().required(),
  brokerFee: Joi.number().required(),
  symbolCoinUsedForPayBrokerFee: Joi.string().required(),
  contributionDate: Joi.number().required(),
})
