/* eslint-disable @typescript-eslint/no-unused-vars */
import { TCrypto } from '@domain/types'
import { IFiatCurrencyUsecase } from '@domain/usecases/fiatCurrency'
import { IFiatCurrencyRepository } from '@services/protocols/contracts/database/repositories/fiat-currency-repository'

export class FiatCurrencyService implements IFiatCurrencyUsecase {
  constructor(private readonly fiatCurrencyRepository: IFiatCurrencyRepository) {}

  async getAll(): Promise<TCrypto.ManyResults> {
    const fiatCurrencies = await this.fiatCurrencyRepository.getAll()
    return {
      error: null,
      data: fiatCurrencies,
    }
  }

  async getOne(symbol: string): Promise<TCrypto.OneResult> {
    const fiatCurrency = await this.fiatCurrencyRepository.getOne(symbol)
    return {
      error: null,
      data: fiatCurrency,
    }
  }
}
