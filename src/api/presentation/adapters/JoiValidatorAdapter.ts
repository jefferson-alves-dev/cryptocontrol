import {
  EmptyStringError,
  GenericUnexpectedKeyError,
  InvalidEmailError,
  InvalidStringFormatError,
  InvalidTypeError,
  MissingParameterError,
  ParametersValueMismatchError,
  StringLengthExceededError,
  StringTooShortError,
  UnexpectedKeyError,
} from '@presentation/errors'
import Joi from 'joi'

import { IValidator, TValidator } from './protocols/contracts/validator'

export class JoiValidatorAdapter implements IValidator {
  private readonly schema: Joi.Schema

  constructor(schema: Joi.Schema) {
    this.schema = schema
  }

  async validate(data: any): Promise<TValidator.Result> {
    try {
      await this.schema.validateAsync(data)
      return makeResult()
    } catch (e) {
      const error = e as Joi.ValidationError
      const typeError = error.details[0].type
      const value = error.details[0].path[0]

      switch (typeError) {
        case 'any.required':
          return makeResult(new MissingParameterError(value))
        case 'string.pattern.base':
          return makeResult(new InvalidStringFormatError(value))
        case 'string.email':
          return makeResult(new InvalidEmailError(value))
        case 'string.max':
          return makeResult(
            new StringLengthExceededError(error.details[0].context?.value, error.details[0].context?.limit),
          )
        case 'string.min':
          return makeResult(new StringTooShortError(error.details[0].context?.value, error.details[0].context?.limit))
        case 'any.only':
          return makeResult(
            new ParametersValueMismatchError(error.details[0].context?.valids[0]?.key, error.details[0].context?.key),
          )
        case 'number.base':
          return makeResult(new InvalidTypeError(error.details[0].context?.key || '', typeof value, 'number'))
        case 'string.empty':
          return makeResult(new EmptyStringError(error.details[0].context?.key || ''))
        case 'object.unknown':
          if (error.details[0].context?.key) {
            return makeResult(new UnexpectedKeyError(error.details[0].context?.key))
          } else {
            return makeResult(new GenericUnexpectedKeyError())
          }
        default:
          console.log(e)

          return makeResult(
            new Error('Unexpected validation error. Please check the data that was sent and try again!'),
          )
      }
    }
  }
}

const makeResult = (error: Error | null = null): TValidator.Result => {
  return {
    error,
  }
}
