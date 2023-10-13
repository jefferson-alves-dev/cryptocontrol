import { TFiatCurrencyRepository } from '@services/protocols/types/fiat-currency-repository'

export interface IFiatCurrencyRepository {
  getAll(): Promise<TFiatCurrencyRepository.ManyResults>
  getOne(symbol: string): Promise<TFiatCurrencyRepository.OneResult>
}
