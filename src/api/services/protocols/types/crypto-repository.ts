export namespace TCryptoRepository {
  export type Create = {
    cryptoID?: string
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
    cryptoID?: string
    name: string
    symbol: string
    slug: string
    logoUrl?: string
    isActive: boolean
  }

  export type OneResult = DataItem | null
  export type ManyResults = DataItem[] | null
}
