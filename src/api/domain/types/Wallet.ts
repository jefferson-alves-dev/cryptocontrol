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

  export type Create = Omit<TWallet.Full, 'id'>

  export type Created = {
    error: globalThis.Error | null
    data: { id: string } | null
  }
}
