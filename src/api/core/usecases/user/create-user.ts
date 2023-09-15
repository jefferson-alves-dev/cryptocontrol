import { TUser } from '@core/types'

export interface ICreateUser {
  create(data: TUser.Create): Promise<TUser.Created>
}
