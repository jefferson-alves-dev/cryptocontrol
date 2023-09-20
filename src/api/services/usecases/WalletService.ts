import { TWallet } from '@domain/types'
import { IWalletUsecase } from '@domain/usecases/wallet'

export class WalletService implements IWalletUsecase {
  constructor(private readonly walletRepository: IWalletRepository) {}
  async create(walletData: TWallet.Create): Promise<TWallet.Created> {}

  async deleteById(id: string): void {}

  async getAll(): Promise<TWallet.Full> {}

  async getById(id: string): Promise<TWallet.Full> {}

  async updateById(id: string, walletData: TWallet.Create): void {}
}
