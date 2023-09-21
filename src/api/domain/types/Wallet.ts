export namespace TWallet {
  export type Full = {
    id: string
    userID: string
    name: string
    isActive: boolean
    createdAt: number
    updatedAt: number | null
    desactivatedAt: number | null
  }

  export type Create = Pick<TWallet.Full, 'name' | 'userID'>

  export type Created = {
    error: globalThis.Error | null
    data: { walletID: string } | null
  }

  export type Update = {
    userID: string
    name: string
    isActive: boolean
    createdAt: number
    updatedAt: number | null
    desactivatedAt: number | null
  }
}
