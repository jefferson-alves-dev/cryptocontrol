import Joi from 'joi'

export const deleteContributionSchema = Joi.object({
  contributionID: Joi.string().min(24).max(24).required(),
})
