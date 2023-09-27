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
  })
})
