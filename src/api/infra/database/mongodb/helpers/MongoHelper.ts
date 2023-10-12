import { MongoDBClientSingleton } from '@infra/database/clients'

export class MongoHelper {
  async createIndexes() {
    const userCollection = await MongoDBClientSingleton.getCollection('users')
    const walletCollection = await MongoDBClientSingleton.getCollection('wallets')
    const withdrawalCollection = await MongoDBClientSingleton.getCollection('withdrawals')
    const contributionCollection = await MongoDBClientSingleton.getCollection('contributions')
    const cryptosCollection = await MongoDBClientSingleton.getCollection('cryptos')
    const fiatCurrenciesCollection = await MongoDBClientSingleton.getCollection('fiatCurrencies')
    await userCollection.createIndex({ email: 1, isActive: 1 })
    await userCollection.createIndex({ isActive: 1 })
    await walletCollection.createIndex({ _id: 1, userID: 1, isActive: 1 })
    await walletCollection.createIndex({ userID: 1, isActive: 1 })
    await withdrawalCollection.createIndex({ _id: 1, symbol: 1, isActive: 1 })
    await contributionCollection.createIndex({ _id: 1, walletID: 1, userID: 1, isActive: 1 })
    await cryptosCollection.createIndex({ _id: 1, criptoID: 1, symbol: 1, isActive: 1 })
    await fiatCurrenciesCollection.createIndex({ _id: 1, fiatID: 1, symbol: 1, isActive: 1 })
  }
}
