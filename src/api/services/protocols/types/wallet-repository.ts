export namespace TWalletRespository {
  export type Full = {
    id: string
    userID: string
    name: string
    isActive: boolean
    createdAt: number
    updatedAt: number | null
    desactivatedAt: number | null
  }

  export type Create = {
    userID: string
    name: string
    isActive: boolean
    createdAt: number
    updatedAt: number | null
    desactivatedAt: number | null
  }

  export type Created = {
    id: string
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
