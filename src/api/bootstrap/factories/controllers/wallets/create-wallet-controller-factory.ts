import { WalletRepositoryMongoDB } from '@infra/database/mongodb/repositories/'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { CreateWalletController } from '@presentation/controllers/wallets/'
import { IController } from '@presentation/protocols/contracts'
import { createWalletSchema } from '@presentation/validations/schemas/wallet'
import { WalletService } from '@services/usecases/WalletService'

export const makeCreateWalletController = (): IController => {
  const walletRepository = new WalletRepositoryMongoDB()
  const walletService = new WalletService(walletRepository)
  const validator = new JoiValidatorAdapter(createWalletSchema)
  return new CreateWalletController(validator, walletService)
}
