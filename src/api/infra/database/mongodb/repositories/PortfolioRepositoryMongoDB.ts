import { MongoDBClientSingleton } from '@infra/database/clients'
import { IPortfolioRepository } from '@services/protocols/contracts/database/repositories/'
import { ObjectId } from 'mongodb'

export class PortfolioRepositoryMongoDB implements IPortfolioRepository {
  async getByWallet(walletID: string, userID: string): Promise<any> {
    const walletCollection = await MongoDBClientSingleton.getCollection('wallets')
    const wallet = await walletCollection
      .aggregate([
        { $match: { _id: new ObjectId(walletID), userID, isActive: true } },
        { $addFields: { wallet_id: { $toString: '$_id' } } },
        {
          $lookup: {
            from: 'contributions',
            pipeline: [{ $match: { isActive: true, userID } }],
            localField: 'wallet_id',
            foreignField: 'walletID',
            as: 'contributions',
          },
        },
        {
          $lookup: {
            from: 'withdrawals',
            pipeline: [{ $match: { isActive: true, userID } }],
            localField: 'wallet_id',
            foreignField: 'walletID',
            as: 'withdrawals',
          },
        },
      ])
      .toArray()

    return wallet.map((wallet) => ({
      id: wallet._id.toHexString(),
      userID: wallet.userID,
      name: wallet.name,
      isActive: wallet.isActive,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
      desactivatedAt: wallet.desactivatedAt,
      contributions: wallet.contributions,
      withdrawals: wallet.withdrawals,
    }))
  }
}
