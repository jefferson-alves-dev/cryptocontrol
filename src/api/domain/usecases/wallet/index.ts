import { TWallet } from '@domain/types'

export interface IWalletUsecase {
  getById(id: string): Promise<TWallet.Full>
  getAll(): Promise<TWallet.Full>
  create(walletData: TWallet.Create): Promise<TWallet.Created>
  updateById(id: string, walletData: TWallet.Create): void
  deleteById(id: string): void
}
