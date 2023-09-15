export namespace TUser {
  export type Full = {
    id: string
    name: string
    email: string
    password: string
    isActive: boolean
    createdAt: number
    updatedAt: number | null
    desactivatedAt: number | null
  }

  export type Create = {
    name: string
    email: string
    password: string
  }

  export type Created = {
    id: string
  }
}
