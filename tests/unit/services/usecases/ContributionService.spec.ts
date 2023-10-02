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
  })
})
