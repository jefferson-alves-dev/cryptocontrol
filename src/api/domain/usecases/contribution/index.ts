import { TContribution } from '@domain/types'

export interface IContribution {
  create(contributionData: TContribution.Create): Promise<TContribution.CreateResult>
  getById(contributionID: string, userID: string): Promise<TContribution.GetResult>
  getAll(userID: string): Promise<TContribution.GetAllResult>
}
