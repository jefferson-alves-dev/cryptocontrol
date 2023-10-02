import { faker } from '@faker-js/faker'
import { IContributionRepository } from '@services/protocols/contracts/database/repositories'
import { TContributionRepository } from '@services/protocols/types'

export class ContributionRepositorySpy implements IContributionRepository {
  contributionData: TContributionRepository.Create = {
    walletID: faker.string.uuid(),
    userID: faker.string.uuid(),
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
  async create(contributionData: TContributionRepository.Create): Promise<TContributionRepository.CreateResult> {
    this.contributionData = contributionData
    return this.resultCreate
  }
}
