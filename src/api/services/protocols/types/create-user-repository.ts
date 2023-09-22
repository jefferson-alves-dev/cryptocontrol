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

  export type UserInfos = {
    id: string
    name: string
    email: string
    password: string
  }

  export type Created = {
    id: string
  }
}
