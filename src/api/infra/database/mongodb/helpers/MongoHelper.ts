import { MongoDBClientSingleton } from '@infra/database/clients'

export class MongoHelper {
  async createIndexes() {
    const userCollection = await MongoDBClientSingleton.getCollection('users')
    const walletCollection = await MongoDBClientSingleton.getCollection('wallets')
    await userCollection.createIndex({ email: 1, isActive: 1 })
    await userCollection.createIndex({ isActive: 1 })
    await walletCollection.createIndex({ _id: 1, userID: 1, isActive: 1 })
    await walletCollection.createIndex({ userID: 1, isActive: 1 })
  }
}
