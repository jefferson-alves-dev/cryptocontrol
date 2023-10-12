import {
  ContributionRepositoryMongoDB,
  UserRepositoryMongoDB,
  WalletRepositoryMongoDB,
} from '@infra/database/mongodb/repositories'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { CreateContributionController } from '@presentation/controllers/contributions'
import { IController } from '@presentation/protocols/contracts'
import { createContributionSchema } from '@presentation/validations/schemas/contribution'
import { ContributionService } from '@services/usecases'

export const makeCreateContributionController = (): IController => {
  const walletRepository = new WalletRepositoryMongoDB()
  const userRepository = new UserRepositoryMongoDB()
  const contributionRepository = new ContributionRepositoryMongoDB()
  const contributionService = new ContributionService(contributionRepository, userRepository, walletRepository)
  const validator = new JoiValidatorAdapter(createContributionSchema)
  return new CreateContributionController(validator, contributionService)
}
