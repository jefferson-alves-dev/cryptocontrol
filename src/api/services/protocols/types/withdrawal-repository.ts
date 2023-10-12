export namespace TWithdrawalRepository {
  export type Create = {
    walletID: string
    userID: string
    withdrawalCoinID: number
    withdrawalCoinSymbol: string
    currentPriceWithdrawalCoin: number
    amountWithdrawalCoin: number
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
    withdrawalCoinID: number
    withdrawalCoinSymbol: string
    currentPriceWithdrawalCoin: number
    amountWithdrawalCoin: number
    withdrawalDate: number
    createdAt: number
  }

  export type GetResult = DataItem | null
  export type GetAllResult = DataItem[] | null
}
