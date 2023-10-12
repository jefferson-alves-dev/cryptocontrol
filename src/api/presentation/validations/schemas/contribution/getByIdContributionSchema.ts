import Joi from 'joi'

export const getByIdContributionSchema = Joi.object({
  contributionID: Joi.string().min(24).max(24).required(),
})
