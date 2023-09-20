import { TUser } from '@domain/types'

export interface IGetUser {
  getByEmail(email: string): Promise<TGetUser.Result>
}

export namespace TGetUser {
  export type Result = TUser.Full
}
