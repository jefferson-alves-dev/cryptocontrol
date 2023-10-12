import {
  UserRepositoryMongoDB,
  WalletRepositoryMongoDB,
  WithdrawalRepositoryMongoDB,
} from '@infra/database/mongodb/repositories'
import { GetAllWithdrawalController } from '@presentation/controllers/withdrawals'
import { IController } from '@presentation/protocols/contracts'
import { WithdrawalService } from '@services/usecases/WithdrawalService'

export const makeGetAllWithdrawalController = (): IController => {
  const walletRepository = new WalletRepositoryMongoDB()
  const userRepository = new UserRepositoryMongoDB()
  const withdrawalRepository = new WithdrawalRepositoryMongoDB()
  const withdrawalService = new WithdrawalService(withdrawalRepository, userRepository, walletRepository)
  return new GetAllWithdrawalController(withdrawalService)
}
