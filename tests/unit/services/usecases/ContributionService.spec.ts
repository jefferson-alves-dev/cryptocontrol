import { TContribution } from '@domain/types'
import { faker } from '@faker-js/faker'
import { ContributionService } from '@services/usecases'

import { ContributionRepositorySpy, UserRepositorySpy, WalletRepositorySpy } from '../mocks'

type SutTypes = {
  sut: ContributionService
  contributionRepositorySpy: ContributionRepositorySpy
  userRepositorySpy: UserRepositorySpy
  walletRepositorySpy: WalletRepositorySpy
}

const makeSut = (): SutTypes => {
  const contributionRepositorySpy = new ContributionRepositorySpy()
  const userRepositorySpy = new UserRepositorySpy()
  const walletRepositorySpy = new WalletRepositorySpy()
  const sut = new ContributionService(contributionRepositorySpy, userRepositorySpy, walletRepositorySpy)
  return {
    sut,
    contributionRepositorySpy,
    userRepositorySpy,
    walletRepositorySpy,
  }
}

const makeFakeContributionData = (): TContribution.Create => ({
  walletID: faker.string.uuid(),
  userID: faker.string.uuid(),
  purchasedCoinID: faker.number.int(),
  purchaseCoinID: faker.number.int(),
  purchasedCoinSymbol: faker.finance.currencyCode(),
  purchaseCoinSymbol: faker.finance.currencyCode(),
  currentPricePurchasedCoin: faker.number.int(),
  amountPurchasedCoin: faker.number.int(),
  contributionDate: new Date().getTime(),
})

describe('ContributionService', () => {
  describe('create()', () => {
    it('should call userRepository.isUserActive() with correct value', async () => {
      const { sut, userRepositorySpy } = makeSut()
      const contributionData = makeFakeContributionData()
      await sut.create(contributionData)
      expect(userRepositorySpy.userID).toBe(contributionData.userID)
    })

    it('should call walletRepository.isUserActive() with correct values', async () => {
      const { sut, walletRepositorySpy } = makeSut()
      const contributionData = makeFakeContributionData()
      await sut.create(contributionData)
      expect(walletRepositorySpy.userID).toBe(contributionData.userID)
      expect(walletRepositorySpy.walletID).toBe(contributionData.walletID)
    })

    it('should return correct result if user is not found', async () => {
      const { sut, userRepositorySpy } = makeSut()
      userRepositorySpy.resultIsUserActive = false
      const contributionData = makeFakeContributionData()
      const result = await sut.create(contributionData)
      expect(result.error).toEqual(new Error('User not found'))
      expect(result.data).toBeNull()
    })

    it('should return correct result if wallet is not found', async () => {
      const { sut, walletRepositorySpy } = makeSut()
      walletRepositorySpy.resultGetById = null
      const contributionData = makeFakeContributionData()
      const result = await sut.create(contributionData)
      expect(result.error).toEqual(new Error('Wallet not found'))
      expect(result.data).toBeNull()
    })

    it('should call contributionRepository.create() with correct values', async () => {
      const { sut, contributionRepositorySpy } = makeSut()
      const contributionData = makeFakeContributionData()
      await sut.create(contributionData)
      expect(contributionRepositorySpy.contributionData).toEqual({
        ...contributionData,
        createdAt: expect.any(Number),
        updatedAt: null,
        desactivatedAt: null,
        isActive: true,
      })
    })

    it('should return correct result on success', async () => {
      const { sut } = makeSut()
      const contributionData = makeFakeContributionData()
      const result = await sut.create(contributionData)
      expect(result.error).toBeNull()
      expect(result.data?.id).toBeTruthy()
    })
  })

  describe('getById()', () => {
    it('should call contributionRepository.getById() with correct values', async () => {
      const { sut, contributionRepositorySpy } = makeSut()
      const contributionID = faker.string.uuid()
      const userID = faker.string.uuid()
      await sut.getById(contributionID, userID)
      expect(contributionRepositorySpy.contributionID).toBe(contributionID)
      expect(contributionRepositorySpy.userID).toBe(userID)
    })

    it('should return correct result if contribution is not found', async () => {
      const { sut, contributionRepositorySpy } = makeSut()
      contributionRepositorySpy.resultGet = null
      const contributionID = faker.string.uuid()
      const userID = faker.string.uuid()
      const result = await sut.getById(contributionID, userID)
      expect(result.error).toEqual(new Error('Contribution not found'))
      expect(result.data).toBeNull()
    })

    it('should return correct result on success', async () => {
      const { sut } = makeSut()
      const contributionID = faker.string.uuid()
      const userID = faker.string.uuid()
      const result = await sut.getById(contributionID, userID)
      expect(result.error).toBeNull()
      expect(result.data?.id).toBeTruthy()
      expect(result.data?.userID).toBeTruthy()
      expect(result.data?.walletID).toBeTruthy()
      expect(result.data?.purchasedCoinID).toBeTruthy()
      expect(result.data?.purchaseCoinID).toBeTruthy()
      expect(result.data?.purchasedCoinSymbol).toBeTruthy()
      expect(result.data?.purchaseCoinSymbol).toBeTruthy()
      expect(result.data?.currentPricePurchasedCoin).toBeTruthy()
      expect(result.data?.amountPurchasedCoin).toBeTruthy()
      expect(result.data?.contributionDate).toBeTruthy()
      expect(result.data?.createdAt).toBeTruthy()
    })
  })

  describe('getAll()', () => {
    it('should call contributionRepository.getAll() with correct value', async () => {
      const { sut, contributionRepositorySpy } = makeSut()
      const userID = faker.string.uuid()
      await sut.getAll(userID)
      expect(contributionRepositorySpy.userID).toBe(userID)
    })

    it('should return correct result if contributions is not found', async () => {
      const { sut, contributionRepositorySpy } = makeSut()
      contributionRepositorySpy.resultGetAll = []
      const userID = faker.string.uuid()
      const result = await sut.getAll(userID)
      expect(result.error).toEqual(new Error('Contributions not found'))
      expect(result.data).toBe(null)
    })

    it('should return correct result on success', async () => {
      const { sut } = makeSut()
      const userID = faker.string.uuid()
      const result = await sut.getAll(userID)
      expect(result.error).toBeNull()
      expect(Array.isArray(result.data)).toBe(true)
      expect(result.data?.length).toBeGreaterThan(0)
      expect(result.data?.[0]).toBeTruthy()
      expect(result.data?.[0]).toBeTruthy()
      expect(result.data?.[0]).toBeTruthy()
      expect(result.data?.[0]).toBeTruthy()
      expect(result.data?.[0]).toBeTruthy()
      expect(result.data?.[0]).toBeTruthy()
      expect(result.data?.[0]).toBeTruthy()
      expect(result.data?.[0]).toBeTruthy()
      expect(result.data?.[0]).toBeTruthy()
      expect(result.data?.[0]).toBeTruthy()
      expect(result.data?.[0]).toBeTruthy()
    })
  })

  describe('deleteById()', () => {
    it('should call contributionRepository.deleteById() with correct values', async () => {
      const { sut, contributionRepositorySpy } = makeSut()
      const contributionID = faker.string.uuid()
      const userID = faker.string.uuid()
      await sut.deleteById(contributionID, userID)
      expect(contributionRepositorySpy.contributionID).toBe(contributionID)
      expect(contributionRepositorySpy.userID).toBe(userID)
    })
  })
})
