import { TContribution } from '@domain/types'
import { IContribution } from '@domain/usecases/contribution'
import {
  IContributionRepository,
  IUserRepository,
  IWalletRepository,
} from '@services/protocols/contracts/database/repositories'

export class ContributionService implements IContribution {
  constructor(
    private readonly contributionRepository: IContributionRepository,
    private readonly userRepository: IUserRepository,
    private readonly walletRepository: IWalletRepository,
  ) {}

  async create(contributionData: TContribution.Create): Promise<TContribution.Result> {
    await this.userRepository.isUserActive(contributionData.userID)
    return {
      id: 'any_id',
    }
  }
}
