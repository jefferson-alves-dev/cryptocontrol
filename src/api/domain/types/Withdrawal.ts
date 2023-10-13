export namespace TWithdrawal {
  export type Create = {
    walletID: string
    userID: string
    symbolCoinUsedForWithdrawal: string
    symbolWithdrawnCoin: string
    amountWithdrawn: number
    withdrawalBrokerFee: number
    symbolCoinUsedForPayWithdrawalBrokerFee: string
    withdrawalDate: number
  }

  type DataItem = {
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

  export type CreateResult = {
    error: globalThis.Error | null
    data: { id: string } | null
  }

  export type DeleteResult = {
    error: globalThis.Error | null
  }

  export type GetResult = {
    error: globalThis.Error | null
    data: DataItem | null
  }

  export type GetAllResult = {
    error: globalThis.Error | null
    data: DataItem[] | null
  }
}
