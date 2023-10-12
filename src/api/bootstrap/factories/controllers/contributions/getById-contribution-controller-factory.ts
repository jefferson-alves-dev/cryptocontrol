import {
  ContributionRepositoryMongoDB,
  UserRepositoryMongoDB,
  WalletRepositoryMongoDB,
} from '@infra/database/mongodb/repositories'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { GetByIdContributionController } from '@presentation/controllers/contributions'
import { IController } from '@presentation/protocols/contracts'
import { getByIdContributionSchema } from '@presentation/validations/schemas/contribution'
import { ContributionService } from '@services/usecases'

export const makeGetByIdContributionController = (): IController => {
  const walletRepository = new WalletRepositoryMongoDB()
  const userRepository = new UserRepositoryMongoDB()
  const contributionRepository = new ContributionRepositoryMongoDB()
  const contributionService = new ContributionService(contributionRepository, userRepository, walletRepository)
  const validator = new JoiValidatorAdapter(getByIdContributionSchema)
  return new GetByIdContributionController(validator, contributionService)
}
