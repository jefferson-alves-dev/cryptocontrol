export namespace TFiatCurrency {
  export type Full = {
    id: string
    fiatID?: string
    name: string
    symbol: string
    slug: string
    logoUrl?: string
    isActive: boolean
  }

  export type Create = {
    fiatID?: string
    name: string
    symbol: string
    slug: string
    logoUrl?: string
    isActive: boolean
  }

  export type Result = {
    error: globalThis.Error | null
    data: TFiatCurrency.Full | null
  }
}
