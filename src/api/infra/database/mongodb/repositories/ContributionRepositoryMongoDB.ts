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
      symbolCoinUsedForPurchase: contribution.symbolCoinUsedForPurchase,
      symbolPurchasedCoin: contribution.symbolPurchasedCoin,
      pricePurchasedCoin: contribution.pricePurchasedCoin,
      totalAmountContributed: contribution.totalAmountContributed,
      amountPurchasedCoin: contribution.amountPurchasedCoin,
      brokerFee: contribution.brokerFee,
      symbolCoinUsedForPayBrokerFee: contribution.symbolCoinUsedForPayBrokerFee,
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
      symbolCoinUsedForPurchase: contributions.symbolCoinUsedForPurchase,
      symbolPurchasedCoin: contributions.symbolPurchasedCoin,
      pricePurchasedCoin: contributions.pricePurchasedCoin,
      totalAmountContributed: contributions.totalAmountContributed,
      amountPurchasedCoin: contributions.amountPurchasedCoin,
      brokerFee: contributions.brokerFee,
      symbolCoinUsedForPayBrokerFee: contributions.symbolCoinUsedForPayBrokerFee,
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
