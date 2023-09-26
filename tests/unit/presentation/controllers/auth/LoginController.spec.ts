import CONFIG from '@config/index'
import { faker } from '@faker-js/faker'
import { LoginController } from '@presentation/controllers/auth'
import { HasherSpy } from '@tests/unit/infra/mock'

import { TokenGeneratorSpy, UserServiceSpy, ValidatorSpy } from '../../mock'

type SutTypes = {
  sut: LoginController
  validatorSpy: ValidatorSpy
  userServiceSpy: UserServiceSpy
  hasherSpy: HasherSpy
  tokenGeneratorSpy: TokenGeneratorSpy
}

const makeSut = (): SutTypes => {
  const validatorSpy = new ValidatorSpy()
  const userServiceSpy = new UserServiceSpy()
  const hasherSpy = new HasherSpy()
  const tokenGeneratorSpy = new TokenGeneratorSpy()
  const sut = new LoginController(validatorSpy, userServiceSpy, hasherSpy, tokenGeneratorSpy)
  return {
    sut,
    validatorSpy,
    userServiceSpy,
    hasherSpy,
    tokenGeneratorSpy,
  }
}

const makeFakeRequest = (): LoginController.Request => ({
  body: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
})

describe('LoginController', () => {
  describe('validator', () => {
    it('should call validator.validate() with correct values', async () => {
      const { sut, validatorSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(validatorSpy.data).toEqual({
        email: httpRequest.body.email,
        password: httpRequest.body.password,
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
    it('should call userService.getByEmail() with correct email', async () => {
      const { sut, userServiceSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(userServiceSpy.userEmail).toBe(httpRequest.body.email)
    })

    it('should return correct http response if userService.getByEmail() returns null', async () => {
      const { sut, userServiceSpy } = makeSut()
      userServiceSpy.resultGetByEmail = null
      const httpRequest = makeFakeRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual({
        statusCode: 400,
        body: new Error('User not found'),
      })
    })
  })

  describe('hasher', () => {
    it('should call hasher.compare() with correct values', async () => {
      const { sut, hasherSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(hasherSpy.textPlain).toBe(httpRequest.body.password + CONFIG.HASH_PASS_SECRET)
    })
  })
})
