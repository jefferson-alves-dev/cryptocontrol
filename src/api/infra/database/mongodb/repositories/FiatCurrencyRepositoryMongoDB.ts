import { MongoDBClientSingleton } from '@infra/database/clients'
import { IFiatCurrencyRepository } from '@services/protocols/contracts/database/repositories/fiat-currency-repository'
import { TFiatCurrencyRepository } from '@services/protocols/types/fiat-currency-repository'

export class FiatCurrencyRepositoryMongoDB implements IFiatCurrencyRepository {
  async getAll(): Promise<TFiatCurrencyRepository.ManyResults> {
    const fiatCurrenciesCollection = await MongoDBClientSingleton.getCollection('fiatCurrencies')
    const fiatCurrencies = await fiatCurrenciesCollection.find({ isActive: true }).toArray()
    if (!fiatCurrencies) return null
    return fiatCurrencies.map((fiatCurrency) => ({
      id: fiatCurrency._id.toHexString(),
      fiatID: fiatCurrency.fiatID,
      name: fiatCurrency.name,
      symbol: fiatCurrency.symbol,
      slug: fiatCurrency.slug,
      logoUrl: fiatCurrency.logoUrl,
      isActive: fiatCurrency.isActive,
    }))
  }

  async getOne(symbol: string): Promise<TFiatCurrencyRepository.OneResult> {
    const fiatCurrenciesCollection = await MongoDBClientSingleton.getCollection('fiatCurrencies')
    const fiatCurrency = await fiatCurrenciesCollection.findOne({ symbol, isActive: true })
    if (!fiatCurrency) return null
    return {
      id: fiatCurrency._id.toHexString(),
      fiatID: fiatCurrency.fiatID,
      name: fiatCurrency.name,
      symbol: fiatCurrency.symbol,
      slug: fiatCurrency.slug,
      logoUrl: fiatCurrency.logoUrl,
      isActive: fiatCurrency.isActive,
    }
  }
}
