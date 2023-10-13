export namespace TFiatCurrencyRepository {
  export type Create = {
    fiatID?: string
    name: string
    symbol: string
    slug: string
    logoUrl?: string
    isActive: boolean
  }

  export type CreateResult = {
    id: string
  }

  export type DataItem = {
    id: string
    fiatID?: string
    name: string
    symbol: string
    slug: string
    logoUrl?: string
    isActive: boolean
  }

  export type OneResult = DataItem | null
  export type ManyResults = DataItem[] | null
}
