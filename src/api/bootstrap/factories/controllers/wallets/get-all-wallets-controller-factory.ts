import { WalletRepositoryMongoDB } from '@infra/database/mongodb/repositories'
import { GetAllWalletsControler } from '@presentation/controllers/wallets'
import { IController } from '@presentation/protocols/contracts'
import { WalletService } from '@services/usecases/WalletService'

export const makeGetAllWalletsController = (): IController => {
  const walletRepository = new WalletRepositoryMongoDB()
  const walletService = new WalletService(walletRepository)
  return new GetAllWalletsControler(walletService)
}
