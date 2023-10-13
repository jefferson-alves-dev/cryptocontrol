export namespace TContribution {
  export type Create = {
    walletID: string
    userID: string
    symbolCoinUsedForPurchase: string
    symbolPurchasedCoin: string
    pricePurchasedCoin: number
    totalAmountContributed: number
    amountPurchasedCoin: number
    brokerFee: number
    symbolCoinUsedForPayBrokerFee: string
    contributionDate: number
  }

  type DataItem = {
    id: string
    walletID: string
    userID: string
    symbolCoinUsedForPurchase: string
    symbolPurchasedCoin: string
    pricePurchasedCoin: number
    totalAmountContributed: number
    amountPurchasedCoin: number
    brokerFee: number
    symbolCoinUsedForPayBrokerFee: string
    contributionDate: number
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
