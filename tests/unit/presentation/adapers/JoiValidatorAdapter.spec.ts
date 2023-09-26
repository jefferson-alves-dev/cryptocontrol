import { faker } from '@faker-js/faker'
import { JoiValidatorAdapter } from '@presentation/adapters'
import {
  InvalidEmailError,
  InvalidStringFormatError,
  MissingParameterError,
  ParametersValueMismatchError,
  StringLengthExceededError,
} from '@presentation/errors'
import { UnexpectedKeyError } from '@presentation/errors/UnexpectedKeyError'
import Joi from 'joi'

describe('JoiValidator Adapter', () => {
  it('should return correct result when data provided is missing parameter', async () => {
    const schema = Joi.object({
      name: Joi.string().required(),
    })
    const sut = new JoiValidatorAdapter(schema)
    const result = await sut.validate({
      email: faker.internet.email(),
    })
    expect(result).toEqual({
      error: new MissingParameterError('name'),
      value: undefined,
    })
  })

  it('should return correct result when expect string format is invalid', async () => {
    const schema = Joi.object({
      name: Joi.string()
        .pattern(/^[a-z]/)
        .required(),
    })
    const sut = new JoiValidatorAdapter(schema)
    const result = await sut.validate({
      name: 'Invalid Value',
    })
    expect(result).toEqual({
      error: new InvalidStringFormatError('name'),
      value: undefined,
    })
  })

  it('should return correct result when an invalid email is provided', async () => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    })
    const sut = new JoiValidatorAdapter(schema)
    const result = await sut.validate({
      email: 'invalid-email',
    })
    expect(result).toEqual({
      error: new InvalidEmailError('email'),
      value: undefined,
    })
  })

  it('should return correct result when a expected max length of string is exceeded', async () => {
    const schema = Joi.object({
      name: Joi.string().max(10).required(),
    })
    const sut = new JoiValidatorAdapter(schema)
    const string = faker.string.alphanumeric(11)
    const result = await sut.validate({
      name: string,
    })
    expect(result).toEqual({
      error: new StringLengthExceededError(string, 10),
      value: undefined,
    })
  })

  it('should return the correct result when expected values do not match', async () => {
    const schema = Joi.object({
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    }).with('password', 'passwordConfirmation')
    const sut = new JoiValidatorAdapter(schema)
    const result = await sut.validate({
      password: 'any_password',
      passwordConfirmation: 'wrong_password',
    })
    expect(result).toEqual({
      error: new ParametersValueMismatchError('password', 'passwordConfirmation'),
      value: undefined,
    })
  })

  it('should return correct result when unexpected key is provided', async () => {
    const schema = Joi.object({
      name: Joi.string().required(),
    })
    const sut = new JoiValidatorAdapter(schema)
    const result = await sut.validate({
      name: 'Any Name',
      unexpected_key: 'any_value',
    })
    expect(result).toEqual({
      error: new UnexpectedKeyError('unexpected_key'),
      value: undefined,
    })
  })
})
