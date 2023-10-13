import { TCrypto } from '@domain/types'

export interface ICryptoUsecase {
  getAll(): Promise<TCrypto.ManyResults>
  getOne(symbol: string): Promise<TCrypto.OneResult>
}
