import { MongoDBClientSingleton } from '@infra/database/clients'
import { IWalletRepository } from '@services/protocols/contracts/database/repositories/'
import { TWalletRespository } from '@services/protocols/types'
import { ObjectId } from 'mongodb'

export class WalletRepositoryMongoDB implements IWalletRepository {
  async create(walletData: TWalletRespository.Create): Promise<TWalletRespository.Created> {
    const walletCollection = await MongoDBClientSingleton.getCollection('wallets')
    const wallet = await walletCollection.insertOne(walletData)
    return { id: wallet.insertedId.toHexString() }
  }

  async getById(walletID: string, userID: string): Promise<TWalletRespository.Full | null> {
    const walletCollection = await MongoDBClientSingleton.getCollection('wallets')
    const wallet = await walletCollection.findOne({ _id: new ObjectId(walletID), userID, isActive: true })
    if (!wallet) return null

    const { _id } = wallet

    return {
      id: _id.toHexString(),
      userID: wallet.userID,
      name: wallet.name,
      isActive: wallet.isActive,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
      desactivatedAt: wallet.desactivatedAt,
    }
  }

  async deleteById(walletID: string, userID: string): Promise<number> {
    const walletCollection = await MongoDBClientSingleton.getCollection('wallets')
    const deleteWallet = await walletCollection.updateOne(
      { _id: new ObjectId(walletID), userID, isActive: true },
      { $set: { isActive: false, desactivatedAt: new Date().getTime() } },
    )

    return deleteWallet.modifiedCount
  }

  async getAll(userID: string): Promise<TWalletRespository.Full[]> {
    const walletCollection = await MongoDBClientSingleton.getCollection('wallets')
    const wallets = await walletCollection.find({ userID, isActive: true }).toArray()
    return wallets.map((wallet) => ({
      id: wallet._id.toHexString(),
      userID: wallet.userID,
      name: wallet.name,
      isActive: wallet.isActive,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
      desactivatedAt: wallet.desactivatedAt,
    }))
  }

  async updateById(walletID: string, walletData: TWalletRespository.Update): Promise<void> {
    const walletCollection = await MongoDBClientSingleton.getCollection('wallets')
    await walletCollection.updateOne({ _id: new ObjectId(walletID), userID: walletData.userID }, { $set: walletData })
    return
  }
}
