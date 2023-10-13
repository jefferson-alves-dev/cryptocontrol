import { MongoDBClientSingleton } from '@infra/database/clients'
import { ICryptoRepository } from '@services/protocols/contracts/database/repositories'
import { TCryptoRepository } from '@services/protocols/types'

export class CryptoRepositoryMongoDB implements ICryptoRepository {
  async getAll(): Promise<TCryptoRepository.ManyResults> {
    const cryptosCollection = await MongoDBClientSingleton.getCollection('cryptos')
    const cryptos = await cryptosCollection.find({ isActive: true }).toArray()
    if (!cryptos) return null
    return cryptos.map((crypto) => ({
      id: crypto._id.toHexString(),
      cryptoID: crypto.cryptoID,
      name: crypto.name,
      symbol: crypto.symbol,
      slug: crypto.slug,
      logoUrl: crypto.logoUrl,
      isActive: crypto.isActive,
    }))
  }

  async getOne(symbol: string): Promise<TCryptoRepository.OneResult> {
    const cryptosCollection = await MongoDBClientSingleton.getCollection('cryptos')
    const crypto = await cryptosCollection.findOne({ symbol })
    if (!crypto) return null
    return {
      id: crypto._id.toHexString(),
      cryptoID: crypto.cryptoID,
      name: crypto.name,
      symbol: crypto.symbol,
      slug: crypto.slug,
      logoUrl: crypto.logoUrl,
      isActive: crypto.isActive,
    }
  }
}
