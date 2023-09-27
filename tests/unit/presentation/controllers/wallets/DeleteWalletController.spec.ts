import { faker } from '@faker-js/faker'
import { DeleteWalletController } from '@presentation/controllers/wallets'

import { ValidatorSpy, WalletServiceSpy } from '../../mocks'

type SutTypes = {
  sut: DeleteWalletController
  validatorSpy: ValidatorSpy
  walletServiceSpy: WalletServiceSpy
}

const makeSut = (): SutTypes => {
  const walletServiceSpy = new WalletServiceSpy()
  const validatorSpy = new ValidatorSpy()
  const sut = new DeleteWalletController(validatorSpy, walletServiceSpy)
  return {
    sut,
    validatorSpy,
    walletServiceSpy,
  }
}

const makeFakeRequest = (): DeleteWalletController.Request => ({
  userData: { userID: faker.string.uuid() },
  params: { walletID: faker.string.uuid() },
})

describe('DeleteWalletController', () => {
  describe('validator', () => {
    it('should call validator.validate() with correct values', async () => {
      const { sut, validatorSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(validatorSpy.data).toEqual(httpRequest.params)
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
    it('should call walletService.deleteById() with correct values', async () => {
      const { sut, walletServiceSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(walletServiceSpy.walletID).toEqual(httpRequest.params.walletID)
      expect(walletServiceSpy.userID).toEqual(httpRequest.userData.userID)
    })
  })
})
