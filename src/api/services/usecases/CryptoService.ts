/* eslint-disable @typescript-eslint/no-unused-vars */
import { TCrypto } from '@domain/types'
import { ICryptoUsecase } from '@domain/usecases/crypto'
import { ICryptoRepository } from '@services/protocols/contracts/database/repositories'

export class CryptoService implements ICryptoUsecase {
  constructor(private readonly cryptoRepository: ICryptoRepository) {}

  async getAll(): Promise<TCrypto.ManyResults> {
    const cryptos = await this.cryptoRepository.getAll()
    return {
      error: null,
      data: cryptos,
    }
  }

  async getOne(symbol: string): Promise<TCrypto.OneResult> {
    const crypto = await this.cryptoRepository.getOne(symbol)
    return {
      error: null,
      data: crypto,
    }
  }
}
