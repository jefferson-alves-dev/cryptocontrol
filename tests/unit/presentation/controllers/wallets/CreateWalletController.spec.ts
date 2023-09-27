import { faker } from '@faker-js/faker'
import { CreateWalletController } from '@presentation/controllers/wallets'

import { ValidatorSpy, WalletServiceSpy } from '../../mock'

type SutTypes = {
  sut: CreateWalletController
  validatorSpy: ValidatorSpy
  walletServiceSpy: WalletServiceSpy
}

const makeSut = (): SutTypes => {
  const walletServiceSpy = new WalletServiceSpy()
  const validatorSpy = new ValidatorSpy()
  const sut = new CreateWalletController(validatorSpy, walletServiceSpy)
  return {
    sut,
    validatorSpy,
    walletServiceSpy,
  }
}

const makeFakeRequest = (): CreateWalletController.Request => ({
  body: {
    name: faker.word.words(3),
  },
  userData: {
    userID: faker.string.uuid(),
  },
})

describe('CreateWalletController', () => {
  describe('validator', () => {
    it('should call validator.validate() with correct values', async () => {
      const { sut, validatorSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(validatorSpy.data).toEqual({
        name: httpRequest.body.name,
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

  describe('walletService', () => {
    it('should call walletService.create() with correct values', async () => {
      const { sut, walletServiceSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(walletServiceSpy.walletDataCreate).toEqual({
        name: httpRequest.body.name,
        userID: httpRequest.userData.userID,
      })
    })

    it('should return correct http response if walletService.create() returns an error', async () => {
      const { sut, walletServiceSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      walletServiceSpy.resultCreate = { error: new Error(), data: null }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual({
        statusCode: 400,
        body: new Error(),
      })
    })
  })
})
