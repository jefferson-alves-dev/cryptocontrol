import { TUser } from '@domain/types'
import { TUserRepositoryData } from '@services/protocols/types'

export interface IUserRepository {
  getByEmail(email: string): Promise<TUser.Full | null>
  getById(id: string): Promise<TUser.Full | null>
  create(data: TUserRepositoryData.Create): Promise<TUserRepositoryData.Created>
  isUserActive(userID: string): Promise<boolean>
}
