import { UserRepositoryMongoDB, WalletRepositoryMongoDB } from '@infra/database/mongodb/repositories'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { DeleteWalletController } from '@presentation/controllers/wallets'
import { IController } from '@presentation/protocols/contracts'
import { deleteWalletSchema } from '@presentation/validations/schemas/wallet'
import { WalletService } from '@services/usecases/WalletService'

export const makeDeleteWalletController = (): IController => {
  const userRepository = new UserRepositoryMongoDB()
  const walletRepository = new WalletRepositoryMongoDB()
  const walletService = new WalletService(walletRepository, userRepository)
  const validator = new JoiValidatorAdapter(deleteWalletSchema)
  return new DeleteWalletController(validator, walletService)
}
