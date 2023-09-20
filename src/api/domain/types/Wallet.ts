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
}
