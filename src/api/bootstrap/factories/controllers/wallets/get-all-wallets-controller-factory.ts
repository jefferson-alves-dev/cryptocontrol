import { UserRepositoryMongoDB, WalletRepositoryMongoDB } from '@infra/database/mongodb/repositories'
import { GetAllWalletsControler } from '@presentation/controllers/wallets'
import { IController } from '@presentation/protocols/contracts'
import { WalletService } from '@services/usecases/WalletService'

export const makeGetAllWalletsController = (): IController => {
  const walletRepository = new WalletRepositoryMongoDB()
  const userRepository = new UserRepositoryMongoDB()
  const walletService = new WalletService(walletRepository, userRepository)
  return new GetAllWalletsControler(walletService)
}
