import {
  UserRepositoryMongoDB,
  WalletRepositoryMongoDB,
  WithdrawalRepositoryMongoDB,
} from '@infra/database/mongodb/repositories'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { GetByIdWithdrawalController } from '@presentation/controllers/withdrawals'
import { IController } from '@presentation/protocols/contracts'
import { getByIdWithdrawalSchema } from '@presentation/validations/schemas/withdrawal'
import { WithdrawalService } from '@services/usecases/WithdrawalService'

export const makeGetByIdWithdrawalController = (): IController => {
  const walletRepository = new WalletRepositoryMongoDB()
  const userRepository = new UserRepositoryMongoDB()
  const withdrawalRepository = new WithdrawalRepositoryMongoDB()
  const withdrawalService = new WithdrawalService(withdrawalRepository, userRepository, walletRepository)
  const validator = new JoiValidatorAdapter(getByIdWithdrawalSchema)
  return new GetByIdWithdrawalController(validator, withdrawalService)
}
