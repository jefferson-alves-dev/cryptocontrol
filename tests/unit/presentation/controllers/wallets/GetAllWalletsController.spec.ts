import { faker } from '@faker-js/faker'
import { GetAllWalletsControler } from '@presentation/controllers/wallets'

import { WalletServiceSpy } from '../../mocks'

type SutTypes = {
  sut: GetAllWalletsControler
  walletServiceSpy: WalletServiceSpy
}

const makeSut = (): SutTypes => {
  const walletServiceSpy = new WalletServiceSpy()
  const sut = new GetAllWalletsControler(walletServiceSpy)
  return {
    sut,
    walletServiceSpy,
  }
}

const makeFakeRequest = (): GetAllWalletsControler.Request => ({
  userData: { userID: faker.string.uuid() },
})

describe('GetAllWalletsControler', () => {
  describe('walletService', () => {
    it('should call walletService.getAll() with correct value', async () => {
      const { sut, walletServiceSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(walletServiceSpy.userID).toEqual(httpRequest.userData.userID)
    })
  })
})
