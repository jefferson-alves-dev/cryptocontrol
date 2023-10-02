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
  describe('create', () => {
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
  })
})
