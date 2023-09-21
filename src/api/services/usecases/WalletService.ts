import { TWallet } from '@domain/types'
import { IWalletUsecase } from '@domain/usecases/wallet'
import { IWalletRepository } from '@services/protocols/contracts/database/repositories'

export class WalletService implements IWalletUsecase {
  constructor(private readonly walletRepository: IWalletRepository) {}
  async create(walletData: TWallet.Create): Promise<TWallet.Created> {
    const wallet = await this.walletRepository.create({
      userID: walletData.userID,
      name: walletData.name,
      isActive: true,
      createdAt: new Date().getTime(),
      updatedAt: null,
      desactivatedAt: null,
    })

    return {
      error: null,
      data: { id: wallet.id },
    }
  }

  async getById(walletID: string, userID: string): Promise<TWallet.Full | null> {
    const wallet = await this.walletRepository.getById(walletID, userID)
    return wallet || null
  }

  async getAll(userID: string): Promise<TWallet.Full[] | null> {
    const wallets = await this.walletRepository.getAll(userID)
    return wallets || null
  }

  async deleteById(walletID: string, userID: string): Promise<void> {
    await this.walletRepository.deleteById(walletID, userID)
    return
  }

  async updateById(walletID: string, walletData: TWallet.Update): Promise<void> {
    await this.walletRepository.updateById(walletID, walletData)
    return
  }
}
