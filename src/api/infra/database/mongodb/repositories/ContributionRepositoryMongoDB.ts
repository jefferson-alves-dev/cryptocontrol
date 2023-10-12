import { MongoDBClientSingleton } from '@infra/database/clients'
import { IContributionRepository } from '@services/protocols/contracts/database/repositories'
import { TContributionRepository } from '@services/protocols/types'
import { ObjectId } from 'mongodb'

export class ContributionRepositoryMongoDB implements IContributionRepository {
  async create(contributionData: TContributionRepository.Create): Promise<TContributionRepository.CreateResult> {
    const contributionsCollection = await MongoDBClientSingleton.getCollection('contributions')
    const newContribution = await contributionsCollection.insertOne(contributionData)
    return { id: newContribution.insertedId.toHexString() }
  }

  async getAll(userID: string): Promise<TContributionRepository.GetAllResult> {
    const contributionsCollection = await MongoDBClientSingleton.getCollection('contributions')
    const contributions = await contributionsCollection.find({ userID, isActive: true }).toArray()
    if (!contributions) return null
    return contributions.map((contribution) => ({
      id: contribution._id.toHexString(),
      walletID: contribution.walletID,
      userID: contribution.userID,
      purchasedCoinID: contribution.purchasedCoinID,
      purchaseCoinID: contribution.purchaseCoinID,
      purchasedCoinSymbol: contribution.purchasedCoinSymbol,
      purchaseCoinSymbol: contribution.purchaseCoinSymbol,
      currentPricePurchasedCoin: contribution.currentPricePurchasedCoin,
      amountPurchasedCoin: contribution.amountPurchasedCoin,
      contributionDate: contribution.contributionDate,
      createdAt: contribution.createdAt,
    }))
  }

  async getById(contributionID: string, userID: string): Promise<TContributionRepository.GetResult> {
    const contributionsCollection = await MongoDBClientSingleton.getCollection('contributions')
    const contributions = await contributionsCollection.findOne({
      _id: new ObjectId(contributionID),
      userID,
      isActive: true,
    })
    if (!contributions) return null
    const { _id } = contributions

    return {
      id: _id.toHexString(),
      walletID: contributions.walletID,
      userID: contributions.userID,
      purchasedCoinID: contributions.purchasedCoinID,
      purchaseCoinID: contributions.purchaseCoinID,
      purchasedCoinSymbol: contributions.purchasedCoinSymbol,
      purchaseCoinSymbol: contributions.purchaseCoinSymbol,
      currentPricePurchasedCoin: contributions.currentPricePurchasedCoin,
      amountPurchasedCoin: contributions.amountPurchasedCoin,
      contributionDate: contributions.contributionDate,
      createdAt: contributions.createdAt,
    }
  }

  async deleteById(contributionID: string, userID: string): Promise<boolean> {
    const contributionCollection = await MongoDBClientSingleton.getCollection('contributions')
    const deletedContribution = await contributionCollection.updateOne(
      { _id: new ObjectId(contributionID), userID, isActive: true },
      { $set: { isActive: false, desactivatedAt: new Date().getTime() } },
    )
    if (deletedContribution.modifiedCount < 1) return false
    return true
  }
}
