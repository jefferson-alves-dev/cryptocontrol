export namespace TContribution {
  export interface Create {
    walletID: string
    userID: string
    purchasedCoinID: number
    purchaseCoinID: number
    purchasedCoinSymbol: string
    purchaseCoinSymbol: string
    currentPricePurchasedCoin: number
    amountPurchasedCoin: number
    contributionDate: number
  }

  export interface Result {
    id: string
  }
}
