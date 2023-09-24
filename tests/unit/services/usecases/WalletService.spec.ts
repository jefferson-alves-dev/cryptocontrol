import { TWallet } from '@domain/types'
import { faker } from '@faker-js/faker'
import { WalletService } from '@services/usecases'
import { throwError } from '@tests/helpers'
import MockDate from 'mockdate'

import { UserRepositorySpy, WalletRepositorySpy } from '../mocks'

type SutTypes = {
  sut: WalletService
  userRepositorySpy: UserRepositorySpy
  walletRepositorySpy: WalletRepositorySpy
}

const makeSut = (): SutTypes => {
  const userRepositorySpy = new UserRepositorySpy()
  const walletRepositorySpy = new WalletRepositorySpy()
  const sut = new WalletService(walletRepositorySpy, userRepositorySpy)
  return {
    sut,
    userRepositorySpy,
    walletRepositorySpy,
  }
}

const makeFakeWalletData = (): TWallet.Create => ({
  name: faker.word.words(3),
  userID: faker.string.alphanumeric(24),
})

describe('WalletService UseCases', () => {
  beforeAll(() => {
    MockDate.set(new Date().getTime())
  })

  afterAll(() => {
    MockDate.reset()
  })

  describe('create()', () => {
    it('should call userRepository.isUserActive() with correct userID', async () => {
      const { sut, userRepositorySpy } = makeSut()
      const walletData = makeFakeWalletData()
      await sut.create(walletData)
      expect(userRepositorySpy.userID).toBe(walletData.userID)
    })
  })

  describe('getById()', () => {})

  describe('getAll()', () => {})

  describe('deleteById()', () => {})

  describe('updateById()', () => {})

  describe('throws', () => {
    it('should throw if userRepository.isUserActive() throws', async () => {
      const { sut, userRepositorySpy } = makeSut()
      jest.spyOn(userRepositorySpy, 'isUserActive').mockImplementationOnce(throwError)
      const walletData = makeFakeWalletData()
      const promise = sut.create(walletData)
      await expect(promise).rejects.toThrow()
    })
  })
})
