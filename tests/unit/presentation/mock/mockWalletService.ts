import { TWallet } from '@domain/types'
import { IWalletUsecase } from '@domain/usecases/wallet'

export class WalletServiceSpy implements IWalletUsecase {
  walletDataCreate: TWallet.Create = {
    name: 'any_wallet_name',
    userID: 'any_user_id',
  }
  resultCreate: TWallet.Created = {
    error: null,
    data: { walletID: 'any_wallet_id' },
  }

  walletID: string = 'any_wallet_id'
  userID: string = 'any_user_id'
  resultDeleteById: TWallet.Deleted = {
    error: null,
    data: {},
  }

  resultGetAll: TWallet.Full[] | null = [
    {
      id: 'any_wallet_id',
      userID: 'any_user_id',
      name: 'any_wallet_name',
      isActive: true,
      createdAt: new Date().getTime(),
      updatedAt: null,
      desactivatedAt: null,
    },
  ]
  resultGetById: TWallet.Full | null = {
    id: 'any_wallet_id',
    userID: 'any_user_id',
    name: 'any_wallet_name',
    isActive: true,
    createdAt: new Date().getTime(),
    updatedAt: null,
    desactivatedAt: null,
  }

  walletDataUpdate: TWallet.Update = {
    name: 'any_wallet_name',
    userID: 'any_user_id',
    isActive: true,
    createdAt: new Date().getTime(),
    updatedAt: null,
    desactivatedAt: null,
  }
  async create(walletData: TWallet.Create): Promise<TWallet.Created> {
    this.walletDataCreate = walletData
    return this.resultCreate
  }

  async deleteById(walletID: string, userID: string): Promise<TWallet.Deleted> {
    this.walletID = walletID
    this.userID = userID
    return this.resultDeleteById
  }

  async getAll(userID: string): Promise<TWallet.Full[] | null> {
    this.userID = userID
    return this.resultGetAll
  }

  async getById(walletID: string, userID: string): Promise<TWallet.Full | null> {
    this.walletID = walletID
    this.userID = userID
    return this.resultGetById
  }

  async updateById(walletID: string, walletData: TWallet.Update): Promise<void> {
    this.walletID = walletID
    this.walletDataUpdate = walletData
    return
  }
}
