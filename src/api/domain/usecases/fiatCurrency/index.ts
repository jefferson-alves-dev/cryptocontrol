import { TCrypto } from '@domain/types'

export interface IFiatCurrencyUsecase {
  getAll(): Promise<TCrypto.ManyResults>
  getOne(symbol: string): Promise<TCrypto.OneResult>
}
