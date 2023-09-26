import { faker } from '@faker-js/faker'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { InvalidStringFormatError, MissingParameterError } from '@presentation/errors'
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
})
