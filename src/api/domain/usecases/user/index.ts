import { TUser } from '@domain/types'

export interface IUserUsecase {
  getByEmail(email: string): Promise<TUserUsecase.Result>
  getById(id: string): Promise<TUserUsecase.Result>
  create(userData: TUser.Create): Promise<TUser.Result>
}

export namespace TUserUsecase {
  export type Result = TUser.Full | null
}
