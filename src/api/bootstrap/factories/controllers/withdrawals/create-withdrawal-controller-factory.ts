import {
  UserRepositoryMongoDB,
  WalletRepositoryMongoDB,
  WithdrawalRepositoryMongoDB,
} from '@infra/database/mongodb/repositories'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { CreateWithdrawalController } from '@presentation/controllers/withdrawals'
import { IController } from '@presentation/protocols/contracts'
import { createWithdrawalSchema } from '@presentation/validations/schemas/withdrawal'
import { WithdrawalService } from '@services/usecases/WithdrawalService'

export const makeCreateWithdrawalController = (): IController => {
  const walletRepository = new WalletRepositoryMongoDB()
  const userRepository = new UserRepositoryMongoDB()
  const withdrawalRepository = new WithdrawalRepositoryMongoDB()
  const withdrawalService = new WithdrawalService(withdrawalRepository, userRepository, walletRepository)
  const validator = new JoiValidatorAdapter(createWithdrawalSchema)
  return new CreateWithdrawalController(validator, withdrawalService)
}
