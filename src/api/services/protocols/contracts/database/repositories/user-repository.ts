import { TUserRepositoryData } from '@services/protocols/types'

export interface IUserRepository {
  getByEmail(email: string): Promise<TUserRepositoryData.UserInfos | null>
  getById(id: string): Promise<TUserRepositoryData.UserInfos | null>
  create(data: TUserRepositoryData.Create): Promise<TUserRepositoryData.Created>
  isUserActive(userID: string): Promise<boolean>
}
