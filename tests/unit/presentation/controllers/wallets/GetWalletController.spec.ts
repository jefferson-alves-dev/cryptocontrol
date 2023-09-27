import { faker } from '@faker-js/faker'
import { GetWalletController } from '@presentation/controllers/wallets/GetWalletController'

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
  })
})
