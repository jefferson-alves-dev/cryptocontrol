import { TContribution } from '@domain/types'

export interface IContributionUsecase {
  create(contributionData: TContribution.Create): Promise<TContribution.CreateResult>
  getById(contributionID: string, userID: string): Promise<TContribution.GetResult>
  getAll(userID: string): Promise<TContribution.GetAllResult>
  deleteById(contributionID: string, userID: string): Promise<TContribution.DeleteResult>
}
