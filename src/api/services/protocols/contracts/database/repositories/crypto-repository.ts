import { TCryptoRepository } from '@services/protocols/types'

export interface ICryptoRepository {
  getAll(): Promise<TCryptoRepository.ManyResults>
  getOne(symbol: string): Promise<TCryptoRepository.OneResult>
}
