export namespace TContributionRepository {
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

  export type GetResult = DataItem | null
  export type GetAllResult = DataItem[] | null
}
