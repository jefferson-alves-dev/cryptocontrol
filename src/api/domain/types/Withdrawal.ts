export namespace TWithdrawal {
  export type Create = {
    walletID: string
    userID: string
    withdrawalCoinID: number
    withdrawalCoinSymbol: string
    currentPriceWithdrawalCoin: number
    amountWithdrawalCoin: number
    withdrawalDate: number
  }

  type DataItem = {
    id: string
    walletID: string
    userID: string
    withdrawalCoinID: number
    withdrawalCoinSymbol: string
    currentPriceWithdrawalCoin: number
    amountWithdrawalCoin: number
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
