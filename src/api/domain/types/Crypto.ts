export namespace TCrypto {
  export type Full = {
    id: string
    cryptoID?: string
    name: string
    symbol: string
    slug: string
    logoUrl?: string
    isActive: boolean
  }

  export type Create = {
    cryptoID?: string
    name: string
    symbol: string
    slug: string
    logoUrl?: string
    isActive: boolean
  }

  export type OneResult = {
    error: globalThis.Error | null
    data: TCrypto.Full | null
  }
}
