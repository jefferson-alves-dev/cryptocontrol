import { TUser } from '@domain/types'

export interface ICreateUser {
  create(data: TUser.Create): Promise<TUser.Created>
}
