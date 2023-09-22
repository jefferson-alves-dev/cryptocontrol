import { TWallet } from '@domain/types'

export interface IWalletUsecase {
  getById(walletID: string, userID: string): Promise<TWallet.Full | null>
  getAll(userID: string): Promise<TWallet.Full[] | null>
  create(walletData: TWallet.Create): Promise<TWallet.Created>
  updateById(walletID: string, walletData: TWallet.Update): Promise<void>
  deleteById(walletID: string, userID: string): Promise<TWallet.Deleted>
}
