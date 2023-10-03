import { faker } from '@faker-js/faker'
import { IContributionRepository } from '@services/protocols/contracts/database/repositories'
import { TContributionRepository } from '@services/protocols/types'

export class ContributionRepositorySpy implements IContributionRepository {
  contributionData: TContributionRepository.Create = {
    userID: faker.string.uuid(),
    walletID: faker.string.uuid(),
    purchasedCoinID: faker.number.int({ min: 2, max: 5 }),
    purchaseCoinID: faker.number.int({ min: 2, max: 5 }),
    purchasedCoinSymbol: faker.finance.currencyCode(),
    purchaseCoinSymbol: faker.finance.currencyCode(),
    currentPricePurchasedCoin: faker.number.int({ min: 2, max: 5 }),
    amountPurchasedCoin: faker.number.float({ min: 8, max: 12, precision: 2 }),
    contributionDate: new Date().getTime(),
    createdAt: new Date().getTime(),
    updatedAt: null,
    desactivatedAt: null,
    isActive: true,
  }
  resultCreate: TContributionRepository.CreateResult = {
    id: faker.string.uuid(),
  }

  contributionID: string = faker.string.uuid()
  userID: string = faker.string.uuid()

  resultGet: TContributionRepository.GetResult = {
    id: faker.string.uuid(),
    userID: faker.string.uuid(),
    walletID: faker.string.uuid(),
    purchasedCoinID: faker.number.int({ min: 2, max: 5 }),
    purchaseCoinID: faker.number.int({ min: 2, max: 5 }),
    purchasedCoinSymbol: faker.finance.currencyCode(),
    purchaseCoinSymbol: faker.finance.currencyCode(),
    currentPricePurchasedCoin: faker.number.int({ min: 2, max: 5 }),
    amountPurchasedCoin: faker.number.float({ min: 8, max: 12, precision: 2 }),
    contributionDate: new Date().getTime(),
    createdAt: new Date().getTime(),
  }

  resultGetAll: TContributionRepository.GetAllResult = [
    {
      id: faker.string.uuid(),
      userID: faker.string.uuid(),
      walletID: faker.string.uuid(),
      purchasedCoinID: faker.number.int({ min: 2, max: 5 }),
      purchaseCoinID: faker.number.int({ min: 2, max: 5 }),
      purchasedCoinSymbol: faker.finance.currencyCode(),
      purchaseCoinSymbol: faker.finance.currencyCode(),
      currentPricePurchasedCoin: faker.number.int({ min: 2, max: 5 }),
      amountPurchasedCoin: faker.number.float({ min: 8, max: 12, precision: 2 }),
      contributionDate: new Date().getTime(),
      createdAt: new Date().getTime(),
    },
    {
      id: faker.string.uuid(),
      userID: faker.string.uuid(),
      walletID: faker.string.uuid(),
      purchasedCoinID: faker.number.int({ min: 2, max: 5 }),
      purchaseCoinID: faker.number.int({ min: 2, max: 5 }),
      purchasedCoinSymbol: faker.finance.currencyCode(),
      purchaseCoinSymbol: faker.finance.currencyCode(),
      currentPricePurchasedCoin: faker.number.int({ min: 2, max: 5 }),
      amountPurchasedCoin: faker.number.float({ min: 8, max: 12, precision: 2 }),
      contributionDate: new Date().getTime(),
      createdAt: new Date().getTime(),
    },
  ]
  resultDeleteById: boolean = true
  async create(contributionData: TContributionRepository.Create): Promise<TContributionRepository.CreateResult> {
    this.contributionData = contributionData
    return this.resultCreate
  }

  async getById(contributionID: string, userID: string): Promise<TContributionRepository.GetResult> {
    this.contributionID = contributionID
    this.userID = userID
    return this.resultGet
  }

  async getAll(userID: string): Promise<TContributionRepository.GetAllResult> {
    this.userID = userID
    return this.resultGetAll
  }

  async deleteById(contributionID: string, userID: string): Promise<boolean> {
    this.contributionID = contributionID
    this.userID = userID
    return this.resultDeleteById
  }
}
