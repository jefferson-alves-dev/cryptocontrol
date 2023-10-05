/* eslint-disable @typescript-eslint/no-unused-vars */
import { TContribution } from '@domain/types'
import { IContributionUsecase } from '@domain/usecases/contribution'
import {
  IContributionRepository,
  IUserRepository,
  IWalletRepository,
} from '@services/protocols/contracts/database/repositories'

export class ContributionService implements IContributionUsecase {
  constructor(
    private readonly contributionRepository: IContributionRepository,
    private readonly userRepository: IUserRepository,
    private readonly walletRepository: IWalletRepository,
  ) {}

  async create(contributionData: TContribution.Create): Promise<TContribution.CreateResult> {
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

  async getById(contributionID: string, userID: string): Promise<TContribution.GetResult> {
    const contribution = await this.contributionRepository.getById(contributionID, userID)
    if (!contribution) {
      return {
        error: new Error('Contribution not found'),
        data: null,
      }
    }
    return {
      error: null,
      data: contribution,
    }
  }

  async getAll(userID: string): Promise<TContribution.GetAllResult> {
    const contributions = await this.contributionRepository.getAll(userID)
    if (!contributions || contributions.length < 1) {
      return {
        error: new Error('Contributions not found'),
        data: null,
      }
    }

    return {
      error: null,
      data: contributions,
    }
  }

  async deleteById(contributionID: string, userID: string): Promise<TContribution.DeleteResult> {
    const deleted = await this.contributionRepository.deleteById(contributionID, userID)
    if (!deleted) {
      return {
        error: new Error('Contribution not found'),
      }
    }
    return {
      error: null,
    }
  }
}
