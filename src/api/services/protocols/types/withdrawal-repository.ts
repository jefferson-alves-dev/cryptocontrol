export namespace TWithdrawalRepository {
  export type Create = {
    walletID: string
    userID: string
    symbolCoinUsedForWithdrawal: string
    symbolWithdrawnCoin: string
    amountWithdrawn: number
    withdrawalBrokerFee: number
    symbolCoinUsedForPayWithdrawalBrokerFee: string
    withdrawalDate: number
    createdAt: number
    updatedAt: number | null
    desactivatedAt: number | null
    isActive: boolean
  }

  export type CreateResult = {
    id: string
  }

  export type DataItem = {
    id: string
    walletID: string
    userID: string
    symbolCoinUsedForWithdrawal: string
    symbolWithdrawnCoin: string
    amountWithdrawn: number
    withdrawalBrokerFee: number
    symbolCoinUsedForPayWithdrawalBrokerFee: string
    withdrawalDate: number
    createdAt: number
  }

  export type GetResult = DataItem | null
  export type GetAllResult = DataItem[] | null
}
