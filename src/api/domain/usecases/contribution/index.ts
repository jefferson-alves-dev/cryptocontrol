import { TContribution } from '@domain/types'

export interface IContribution {
  create(contributionData: TContribution.Create): Promise<TContribution.Result>
}
