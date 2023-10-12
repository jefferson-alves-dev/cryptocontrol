import { MongoDBClientSingleton } from '@infra/database/clients'
import { IWithdrawalRepository } from '@services/protocols/contracts/database/repositories'
import { TWithdrawalRepository } from '@services/protocols/types'
import { ObjectId } from 'mongodb'

export class WithdrawalRepositoryMongoDB implements IWithdrawalRepository {
  async create(withdrawalData: TWithdrawalRepository.Create): Promise<TWithdrawalRepository.CreateResult> {
    const withdrawalsCollection = await MongoDBClientSingleton.getCollection('withdrawals')
    const newWithdrawal = await withdrawalsCollection.insertOne(withdrawalData)
    return { id: newWithdrawal.insertedId.toHexString() }
  }

  async getAll(userID: string): Promise<TWithdrawalRepository.GetAllResult> {
    const withdrawalsCollection = await MongoDBClientSingleton.getCollection('withdrawals')
    const withdrawals = await withdrawalsCollection.find({ userID, isActive: true }).toArray()
    if (!withdrawals) return null
    return withdrawals.map((withdrawal) => ({
      id: withdrawal._id.toHexString(),
      walletID: withdrawal.walletID,
      userID: withdrawal.userID,
      withdrawalCoinID: withdrawal.withdrawalCoinID,
      withdrawalCoinSymbol: withdrawal.withdrawalCoinSymbol,
      currentPriceWithdrawalCoin: withdrawal.currentPriceWithdrawalCoin,
      amountWithdrawalCoin: withdrawal.amountWithdrawalCoin,
      withdrawalDate: withdrawal.withdrawalDate,
      createdAt: withdrawal.createdAt,
    }))
  }

  async getById(withdrawalID: string, userID: string): Promise<TWithdrawalRepository.GetResult> {
    const withdrawalsCollection = await MongoDBClientSingleton.getCollection('withdrawals')
    const withdrawals = await withdrawalsCollection.findOne({
      _id: new ObjectId(withdrawalID),
      userID,
      isActive: true,
    })
    if (!withdrawals) return null
    const { _id } = withdrawals

    return {
      id: _id.toHexString(),
      walletID: withdrawals.walletID,
      userID: withdrawals.userID,
      withdrawalCoinID: withdrawals.withdrawalCoinID,
      withdrawalCoinSymbol: withdrawals.withdrawalCoinSymbol,
      currentPriceWithdrawalCoin: withdrawals.currentPriceWithdrawalCoin,
      amountWithdrawalCoin: withdrawals.amountWithdrawalCoin,
      withdrawalDate: withdrawals.withdrawalDate,
      createdAt: withdrawals.createdAt,
    }
  }

  async deleteById(withdrawalID: string, userID: string): Promise<boolean> {
    const withdrawalCollection = await MongoDBClientSingleton.getCollection('withdrawals')
    const deletedWithdrawal = await withdrawalCollection.updateOne(
      { _id: new ObjectId(withdrawalID), userID, isActive: true },
      { $set: { isActive: false, desactivatedAt: new Date().getTime() } },
    )
    if (deletedWithdrawal.modifiedCount < 1) return false
    return true
  }
}
