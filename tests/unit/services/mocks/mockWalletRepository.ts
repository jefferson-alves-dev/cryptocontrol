import { IWalletRepository } from '@services/protocols/contracts/database/repositories'
import { TWalletRespository } from '@services/protocols/types'

export class WalletRepositorySpy implements IWalletRepository {
  walletData: TWalletRespository.Create = {
    userID: '',
    name: '',
    isActive: true,
    createdAt: new Date().getTime() / 1000,
    updatedAt: null,
    desactivatedAt: null,
  }
  walletID: string = ''
  userID: string = ''
  resultCreate: TWalletRespository.Created = {
    id: '',
  }
  resultGetById: TWalletRespository.Full | null = null
  resultGetAll: TWalletRespository.Full[] = []
  resultDeleteById: number = 0
  resultUpdateById: void = undefined
  async create(walletData: TWalletRespository.Create): Promise<TWalletRespository.Created> {
    this.walletData = walletData
    return Promise.resolve(this.resultCreate)
  }

  async getById(walletID: string, userID: string): Promise<TWalletRespository.Full | null> {
    this.walletID = walletID
    this.userID = userID
    return Promise.resolve(this.resultGetById)
  }

  async getAll(userID: string): Promise<TWalletRespository.Full[]> {
    this.userID = userID
    return Promise.resolve(this.resultGetAll)
  }

  async deleteById(walletID: string, userID: string): Promise<number> {
    this.walletID = walletID
    this.userID = userID
    return Promise.resolve(this.resultDeleteById)
  }

  async updateById(walletID: string, walletData: TWalletRespository.Update): Promise<void> {
    this.walletID = walletID
    this.walletData = walletData
    return Promise.resolve(this.resultUpdateById)
  }
}
