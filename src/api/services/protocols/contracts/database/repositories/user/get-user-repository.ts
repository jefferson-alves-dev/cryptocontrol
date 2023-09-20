import { TUser } from '@domain/types'

export interface IGetUserRepository {
  getByEmail(email: string): Promise<TUser.Full>
}
