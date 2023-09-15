import Joi from 'joi'

export const signupValidationSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-ZçÇ ]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.pattern.base': 'The "name" field should only contain letters and spaces.',
      'string.min': 'The "name" field should be at least {#limit} characters.',
      'string.max': 'The "name" field should be at most {#limit} characters.',
      'any.required': 'The "name" field is required.',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(3)
    .max(80)
    .required()
    .messages({
      'string.email': 'The "email" field must be a valid email address.',
      'string.min': 'The "email" field should be at least {#limit} characters.',
      'string.max': 'The "email" field should be at most {#limit} characters.',
      'any.required': 'The "email" field is required.',
    }),
  password: Joi.string()
    .pattern(/^.{8,64}$/)
    .required()
    .messages({
      'string.pattern.base': 'The "password" field should have alphanumeric characters only.',
      'any.required': 'The "password" field is required.',
    }),
  passwordConfirmation: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'The "passwordConfirmation" field must match the "password" field.',
    'any.required': 'The "passwordConfirmation" field is required.',
  }),
}).with('password', 'passwordConfirmation')
