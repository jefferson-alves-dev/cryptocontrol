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

  export type Result = {
    error: globalThis.Error | null
    data: TCrypto.Full | null
  }
}
