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

    it('should return correct result if userRepository.isUserActive() returns false', async () => {
      const { sut, userRepositorySpy } = makeSut()
      const walletData = makeFakeWalletData()
      userRepositorySpy.resultIsUserActive = false
      const result = await sut.create(walletData)
      expect(result.error).toEqual(new Error('User not found'))
      expect(result.error?.message).toBe('User not found')
      expect(result.data).toEqual(null)
    })

    it('should call walletRepository.create() with correct walletData', async () => {
      const { sut, walletRepositorySpy } = makeSut()
      const walletData = makeFakeWalletData()
      await sut.create(walletData)
      expect(walletRepositorySpy.walletData).toEqual({
        userID: walletData.userID,
        name: walletData.name,
        isActive: true,
        createdAt: new Date().getTime(),
        updatedAt: null,
        desactivatedAt: null,
      })
    })

    it('should return correct result on walletRepository.create() success', async () => {
      const { sut, walletRepositorySpy } = makeSut()
      const walletData = makeFakeWalletData()
      const walletID = faker.string.alphanumeric(24)
      walletRepositorySpy.resultCreate = {
        id: walletID,
      }
      const result = await sut.create(walletData)
      expect(result.error).toEqual(null)
      expect(result.data).toEqual({
        walletID: walletID,
      })
      expect(result.data?.walletID.length).toBe(24)
    })
  })

  describe('getById()', () => {
    it('should call walletRepository.getById() with correct values', async () => {
      const { sut, walletRepositorySpy } = makeSut()
      const walletID = faker.string.uuid()
      const userID = faker.string.uuid()
      await sut.getById(walletID, userID)
      expect(walletRepositorySpy.walletID).toBe(walletID)
      expect(walletRepositorySpy.userID).toBe(userID)
    })
  })

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

    it('should throw if walletRepository.create() throws', async () => {
      const { sut, walletRepositorySpy } = makeSut()
      jest.spyOn(walletRepositorySpy, 'create').mockImplementationOnce(throwError)
      const walletData = makeFakeWalletData()
      const promise = sut.create(walletData)
      await expect(promise).rejects.toThrow()
    })

    it('should throw if walletRepository.getById() throws', async () => {
      const { sut, walletRepositorySpy } = makeSut()
      const walletID = faker.string.uuid()
      const userID = faker.string.uuid()
      jest.spyOn(walletRepositorySpy, 'getById').mockImplementationOnce(throwError)
      const promise = sut.getById(walletID, userID)
      await expect(promise).rejects.toThrow()
    })
  })
})
