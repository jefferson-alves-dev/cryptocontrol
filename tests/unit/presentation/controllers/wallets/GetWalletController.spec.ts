import { faker } from '@faker-js/faker'
import { GetWalletController } from '@presentation/controllers/wallets/GetWalletController'
import { throwError } from '@tests/helpers'

import { ValidatorSpy, WalletServiceSpy } from '../../mocks'

type SutTypes = {
  sut: GetWalletController
  validatorSpy: ValidatorSpy
  walletServiceSpy: WalletServiceSpy
}

const makeSut = (): SutTypes => {
  const walletServiceSpy = new WalletServiceSpy()
  const validatorSpy = new ValidatorSpy()
  const sut = new GetWalletController(validatorSpy, walletServiceSpy)
  return {
    sut,
    validatorSpy,
    walletServiceSpy,
  }
}

const makeFakeRequest = (): GetWalletController.Request => ({
  userData: { userID: faker.string.uuid() },
  params: { walletID: faker.string.uuid() },
  body: {
    name: faker.word.words(3),
  },
})

describe('GetWalletController', () => {
  describe('validator', () => {
    it('should call validator.validate() with correct value', async () => {
      const { sut, validatorSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(validatorSpy.data).toEqual({
        walletID: httpRequest.params.walletID,
      })
    })

    it('should return correct http response if validator.validate() returns error', async () => {
      const { sut, validatorSpy } = makeSut()
      validatorSpy.resultValidate = { error: new Error() }
      const httpRequest = makeFakeRequest()
      const result = await sut.handle(httpRequest)
      expect(result).toEqual({
        statusCode: 400,
        body: new Error(),
      })
    })
  })

  describe('walletService', () => {
    it('should call walletService.getById() with correct value', async () => {
      const { sut, walletServiceSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(walletServiceSpy.walletID).toEqual(httpRequest.params.walletID)
      expect(walletServiceSpy.userID).toEqual(httpRequest.userData.userID)
    })

    it('should return correct http response if walletService.getById() fails', async () => {
      const { sut, walletServiceSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      walletServiceSpy.resultGetById = null
      const result = await sut.handle(httpRequest)
      expect(result).toEqual({
        statusCode: 404,
        body: new Error('Wallet not found'),
      })
    })
  })

  describe('throws', () => {
    it('should return correct http response if validator.validate() throws', async () => {
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
