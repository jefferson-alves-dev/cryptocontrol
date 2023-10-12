import {
  ContributionRepositoryMongoDB,
  UserRepositoryMongoDB,
  WalletRepositoryMongoDB,
} from '@infra/database/mongodb/repositories'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { GetAllContributionController } from '@presentation/controllers/contributions'
import { IController } from '@presentation/protocols/contracts'
import { getByIdContributionSchema } from '@presentation/validations/schemas/contribution'
import { ContributionService } from '@services/usecases'

export const makeGetAllContributionController = (): IController => {
  const walletRepository = new WalletRepositoryMongoDB()
  const userRepository = new UserRepositoryMongoDB()
  const contributionRepository = new ContributionRepositoryMongoDB()
  const contributionService = new ContributionService(contributionRepository, userRepository, walletRepository)
  const validator = new JoiValidatorAdapter(getByIdContributionSchema)
  return new GetAllContributionController(validator, contributionService)
}
