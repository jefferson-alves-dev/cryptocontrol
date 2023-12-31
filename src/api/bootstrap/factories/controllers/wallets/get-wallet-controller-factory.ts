import { UserRepositoryMongoDB, WalletRepositoryMongoDB } from '@infra/database/mongodb/repositories'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { GetWalletController } from '@presentation/controllers/wallets/GetWalletController'
import { IController } from '@presentation/protocols/contracts'
import { getWalletSchema } from '@presentation/validations/schemas/wallet/getWalletSchema'
import { WalletService } from '@services/usecases/WalletService'

export const makeGetWalletController = (): IController => {
  const walletRepository = new WalletRepositoryMongoDB()
  const userRepository = new UserRepositoryMongoDB()
  const walletService = new WalletService(walletRepository, userRepository)
  const validator = new JoiValidatorAdapter(getWalletSchema)
  return new GetWalletController(validator, walletService)
}
