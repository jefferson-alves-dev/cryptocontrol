import { faker } from '@faker-js/faker'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { MissingParameterError } from '@presentation/errors'
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
      isValid: false,
    })
  })
})
