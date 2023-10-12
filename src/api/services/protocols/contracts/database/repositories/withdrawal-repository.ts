import { TWithdrawalRepository } from '@services/protocols/types/withdrawal-repository'

export interface IWithdrawalRepository {
  create(withdrawalData: TWithdrawalRepository.Create): Promise<TWithdrawalRepository.CreateResult>
  getById(withdrawalID: string, userID: string): Promise<TWithdrawalRepository.GetResult>
  getAll(userID: string): Promise<TWithdrawalRepository.GetAllResult>
  deleteById(withdrawalID: string, userID: string): Promise<boolean>
}
