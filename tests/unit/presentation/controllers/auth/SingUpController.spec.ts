import { faker } from '@faker-js/faker'
import { SignUpController } from '@presentation/controllers/auth'
import { HasherSpy } from '@tests/unit/infra/mock'

import { UserServiceSpy, ValidatorSpy } from '../../mock'

type SutTypes = {
  sut: SignUpController
  validatorSpy: ValidatorSpy
  userServiceSpy: UserServiceSpy
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const userServiceSpy = new UserServiceSpy()
  const validatorSpy = new ValidatorSpy()
  const sut = new SignUpController(validatorSpy, userServiceSpy, hasherSpy)
  return {
    sut,
    validatorSpy,
    userServiceSpy,
    hasherSpy,
  }
}

const makeFakeRequest = (): SignUpController.Request => ({
  body: {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
})

describe('SignUpController', () => {
  describe('validator', () => {
    it('should call validator.validate() with correct values', async () => {
      const { sut, validatorSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(validatorSpy.data).toEqual({
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        password: httpRequest.body.password,
        passwordConfirmation: httpRequest.body.passwordConfirmation,
      })
    })
  })
})
