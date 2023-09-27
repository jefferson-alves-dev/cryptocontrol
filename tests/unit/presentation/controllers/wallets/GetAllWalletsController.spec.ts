import { faker } from '@faker-js/faker'
import { GetAllWalletsControler } from '@presentation/controllers/wallets'
import { MissingParameterError } from '@presentation/errors'
import { throwError } from '@tests/helpers'

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
  describe('internal validations ', () => {
    it('should return correct http response when data provided is missing parameter userID', async () => {
      const { sut } = makeSut()
      const httpRequest = {}
      const result = await sut.handle(httpRequest as GetAllWalletsControler.Request)
      expect(result).toEqual({
        statusCode: 400,
        body: new MissingParameterError('userID'),
      })
    })
  })

  describe('walletService', () => {
    it('should call walletService.getAll() with correct value', async () => {
      const { sut, walletServiceSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(walletServiceSpy.userID).toEqual(httpRequest.userData.userID)
    })
  })

  describe('throws', () => {
    it('should returns correct http response if walletService.getAll() throws', async () => {
      const { sut, walletServiceSpy } = makeSut()
      jest.spyOn(walletServiceSpy, 'getAll').mockRejectedValueOnce(throwError)
      const httpRequest = makeFakeRequest()
      const result = await sut.handle(httpRequest)
      expect(result).toEqual({
        statusCode: 500,
        body: new Error('Internal server error'),
      })
    })
  })
})
