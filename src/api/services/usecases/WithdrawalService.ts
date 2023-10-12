/* eslint-disable @typescript-eslint/no-unused-vars */
import { TWithdrawal } from '@domain/types'
import { IWithdrawalUsecase } from '@domain/usecases/withdrawal'
import {
  IUserRepository,
  IWalletRepository,
  IWithdrawalRepository,
} from '@services/protocols/contracts/database/repositories'

export class WithdrawalService implements IWithdrawalUsecase {
  constructor(
    private readonly withdrawalRepository: IWithdrawalRepository,
    private readonly userRepository: IUserRepository,
    private readonly walletRepository: IWalletRepository,
  ) {}

  async create(withdrawalData: TWithdrawal.Create): Promise<TWithdrawal.CreateResult> {
    const [userExists, walletExists] = await Promise.all([
      this.userRepository.isUserActive(withdrawalData.userID),
      this.walletRepository.getById(withdrawalData.walletID, withdrawalData.userID),
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

    const withdrawal = await this.withdrawalRepository.create({
      ...withdrawalData,
      createdAt: new Date().getTime(),
      updatedAt: null,
      desactivatedAt: null,
      isActive: true,
    })

    return {
      error: null,
      data: {
        id: withdrawal.id,
      },
    }
  }

  async getById(withdrawalID: string, userID: string): Promise<TWithdrawal.GetResult> {
    const withdrawal = await this.withdrawalRepository.getById(withdrawalID, userID)
    if (!withdrawal) {
      return {
        error: new Error('Withdrawal not found'),
        data: null,
      }
    }
    return {
      error: null,
      data: withdrawal,
    }
  }

  async getAll(userID: string): Promise<TWithdrawal.GetAllResult> {
    const withdrawals = await this.withdrawalRepository.getAll(userID)
    if (!withdrawals || withdrawals.length < 1) {
      return {
        error: new Error('Withdrawals not found'),
        data: null,
      }
    }

    return {
      error: null,
      data: withdrawals,
    }
  }

  async deleteById(withdrawalID: string, userID: string): Promise<TWithdrawal.DeleteResult> {
    const deleted = await this.withdrawalRepository.deleteById(withdrawalID, userID)
    if (!deleted) {
      return {
        error: new Error('Withdrawal not found'),
      }
    }
    return {
      error: null,
    }
  }
}
