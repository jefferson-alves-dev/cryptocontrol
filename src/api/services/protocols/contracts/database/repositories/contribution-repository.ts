import { TContributionRepository } from '@services/protocols/types/contribution-repository'

export interface IContributionRepository {
  create(contributionData: TContributionRepository.Create): Promise<TContributionRepository.CreateResult>
  getById(contributionID: string, userID: string): Promise<TContributionRepository.GetResult>
}
