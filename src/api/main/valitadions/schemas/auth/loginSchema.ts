import Joi from 'joi'

export const loginValidationSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})
