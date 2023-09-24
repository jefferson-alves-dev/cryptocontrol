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

const makeFullWalletData = (): TWallet.Full => ({
  id: faker.string.alphanumeric(24),
  userID: faker.string.alphanumeric(24),
  name: faker.word.words(3),
  isActive: true,
  createdAt: faker.date.past().getTime(),
  updatedAt: null,
  desactivatedAt: null,
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

    it('should return null if walletRepository.getById() returns null', async () => {
      const { sut, walletRepositorySpy } = makeSut()
      const walletID = faker.string.uuid()
      const userID = faker.string.uuid()
      walletRepositorySpy.resultGetById = null
      const result = await sut.getById(walletID, userID)
      expect(result).toBe(null)
    })

    it('should return an wallet if walletRepository.getById() returns an wallet', async () => {
      const { sut, walletRepositorySpy } = makeSut()
      const walletID = faker.string.uuid()
      const userID = faker.string.uuid()
      walletRepositorySpy.resultGetById = makeFullWalletData()
      const result = await sut.getById(walletID, userID)
      expect(typeof result?.id).toBe('string')
      expect(result?.id.length).toBeGreaterThan(0)
      expect(typeof result?.userID).toBe('string')
      expect(result?.userID.length).toBeGreaterThan(0)
      expect(typeof result?.name).toBe('string')
      expect(result?.name.length).toBeGreaterThan(0)
      expect(typeof result?.isActive).toBe('boolean')
      expect(typeof result?.createdAt).toBe('number')
      expect(result?.updatedAt).toBe(null)
      expect(result?.desactivatedAt).toBe(null)
    })
  })

  describe('getAll()', () => {
    it('should call walletRepository.getAll() with correct values', async () => {
      const { sut, walletRepositorySpy } = makeSut()
      const userID = faker.string.uuid()
      await sut.getAll(userID)
      expect(walletRepositorySpy.userID).toBe(userID)
    })

    it('should return an empty array if walletRepository.getAll() returns an empty array', async () => {
      const { sut } = makeSut()
      const userID = faker.string.uuid()
      const result = await sut.getAll(userID)
      expect(result).toEqual([])
    })

    it('should return a list of wallets if walletRepository.getAll() returns an array with wallets', async () => {
      const { sut, walletRepositorySpy } = makeSut()
      const userID = faker.string.uuid()
      const expectedWallets = [makeFullWalletData(), makeFullWalletData()]
      walletRepositorySpy.resultGetAll = [...expectedWallets]
      const result = await sut.getAll(userID)
      expect(Array.isArray(result)).toBe(true)
      const isValidWallet = (wallet: TWallet.Full) => {
        return (
          typeof wallet.id === 'string' &&
          wallet.id.length > 0 &&
          typeof wallet.userID === 'string' &&
          wallet.userID.length > 0 &&
          typeof wallet.name === 'string' &&
          wallet.name.length > 0 &&
          typeof wallet.isActive === 'boolean' &&
          typeof wallet.createdAt === 'number' &&
          wallet.updatedAt === null &&
          wallet.desactivatedAt === null
        )
      }
      expect(result?.every(isValidWallet)).toBe(true)
    })
  })

  describe('deleteById()', () => {
    it('should call userRepository.isUserActive() with correct userID', async () => {
      const { sut, userRepositorySpy } = makeSut()
      const walletData = makeFullWalletData()
      await sut.deleteById(walletData.id, walletData.userID)
      expect(userRepositorySpy.userID).toBe(walletData.userID)
    })
  })

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

    it('should throw if walletRepository.getAll() throws', async () => {
      const { sut, walletRepositorySpy } = makeSut()
      const userID = faker.string.uuid()
      jest.spyOn(walletRepositorySpy, 'getAll').mockImplementationOnce(throwError)
      const promise = sut.getAll(userID)
      await expect(promise).rejects.toThrow()
    })
  })
})
