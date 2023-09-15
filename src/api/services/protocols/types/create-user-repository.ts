export namespace TUserRepositoryData {
  export type Create = {
    name: string
    email: string
    password: string
    isActive: boolean
    createdAt: number
    updatedAt: null
    desactivatedAt: null
  }

  export type Created = {
    id: string
  }
}
