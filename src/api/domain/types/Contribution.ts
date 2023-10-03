export namespace TContribution {
  export type Create = {
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

  export type CreateResult = {
    error: globalThis.Error | null
    data: { id: string } | null
  }

  export type GetResult = {
    error: globalThis.Error | null
    data: {
      id: string
      walletID: string
      userID: string
      purchasedCoinID: number
      purchaseCoinID: number
      purchasedCoinSymbol: string
      purchaseCoinSymbol: string
      currentPricePurchasedCoin: number
      amountPurchasedCoin: number
      contributionDate: number
      createdAt: number
    } | null
  }
}
