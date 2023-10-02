/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const [userExists, walletExists] = await Promise.all([
      this.userRepository.isUserActive(contributionData.userID),
      this.walletRepository.getById(contributionData.walletID, contributionData.userID),
    ])

    if (!userExists) {
      return {
        error: new Error('User not found'),
        data: null,
      }
    }

    if (!walletExists) {
      return {
        error: new Error('Wallet not found'),
        data: null,
      }
    }

    const contribution = await this.contributionRepository.create({
      ...contributionData,
      createdAt: new Date().getTime(),
      updatedAt: null,
      desactivatedAt: null,
      isActive: true,
    })

    return {
      error: null,
      data: {
        id: contribution.id,
      },
    }
  }
}
