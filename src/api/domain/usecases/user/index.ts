import { TUser } from '@domain/types'

import { IHasher } from '../cryptography'

export interface IUserUsecase {
  getByEmail(userEmail: string): Promise<TUserUsecase.Result>
  getById(userID: string): Promise<TUserUsecase.Result>
  create(userData: TUser.Create, hasher: IHasher): Promise<TUser.Result>
}

export namespace TUserUsecase {
  export type Result = {
    id: string
    name: string
    email: string
    password: string
  } | null
}
