import { TUserRepositoryData } from '@services/protocols/types'

export interface ICreateUserRepository {
  create(data: TUserRepositoryData.Create): Promise<TUserRepositoryData.Created>
}
