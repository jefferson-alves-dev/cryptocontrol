import { faker } from '@faker-js/faker'
import { SignUpController } from '@presentation/controllers/auth'
import { throwError } from '@tests/helpers'
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

    it('should return correct http response if validator.validate() returns error', async () => {
      const { sut, validatorSpy } = makeSut()
      validatorSpy.resultValidate = { error: new Error() }
      const httpRequest = makeFakeRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual({
        statusCode: 400,
        body: new Error(),
      })
    })
  })

  describe('userService', () => {
    it('should call userService.create() with correct email', async () => {
      const { sut, userServiceSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(userServiceSpy.userData.email).toBe(httpRequest.body.email)
    })

    it('should return correct http response if userService.create() returns an error', async () => {
      const { sut, userServiceSpy } = makeSut()
      userServiceSpy.resultCreate = { error: new Error(), data: null }
      const httpRequest = makeFakeRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual({
        statusCode: 400,
        body: new Error(),
      })
    })
  })

  describe('throws', () => {
    it('should return correct http response if validator throws', async () => {
      const { sut, validatorSpy } = makeSut()
      jest.spyOn(validatorSpy, 'validate').mockImplementationOnce(throwError)
      const httpRequest = makeFakeRequest()
      const result = await sut.handle(httpRequest)
      expect(result).toEqual({
        statusCode: 500,
        body: new Error('Internal server error'),
      })
    })
  })
})
