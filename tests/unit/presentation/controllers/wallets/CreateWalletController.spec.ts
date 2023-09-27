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
  })
})
