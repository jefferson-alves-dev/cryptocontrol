import { TWalletRespository } from '@services/protocols/types'

export interface IWalletRepository {
  getById(walletID: string, userID: string): Promise<TWalletRespository.Full | null>
  getAll(userID: string): Promise<TWalletRespository.Full[]>
  create(walletData: TWalletRespository.Create): Promise<TWalletRespository.Created>
  updateById(walletID: string, walletData: TWalletRespository.Update): Promise<void>
  deleteById(walletID: string, userID: string): Promise<number>
}
