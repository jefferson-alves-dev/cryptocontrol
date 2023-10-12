import { TWithdrawal } from '@domain/types'

export interface IWithdrawalUsecase {
  create(withdrawalData: TWithdrawal.Create): Promise<TWithdrawal.CreateResult>
  getById(withdrawalID: string, userID: string): Promise<TWithdrawal.GetResult>
  getAll(userID: string): Promise<TWithdrawal.GetAllResult>
  deleteById(withdrawalID: string, userID: string): Promise<TWithdrawal.DeleteResult>
}
