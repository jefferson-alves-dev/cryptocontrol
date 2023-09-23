import { IUserRepository } from '@services/protocols/contracts/database/repositories'
import { TUserRepositoryData } from '@services/protocols/types'

export class UserRepositorySpy implements IUserRepository {
  data: TUserRepositoryData.Create = {
    name: '',
    email: '',
    password: '',
    isActive: true,
    createdAt: new Date().getTime() / 1000,
    updatedAt: null,
    desactivatedAt: null,
  }
  email: string = ''
  id: string = ''
  userID: string = ''
  resultGetById: TUserRepositoryData.UserInfos | null = {
    id: '',
    email: '',
    name: '',
    password: '',
  }
  resultGetByEmail: TUserRepositoryData.UserInfos | null = null
  resultCreate: TUserRepositoryData.Created = {
    id: '',
  }
  resultIsUserActive: boolean = true
  async create(data: TUserRepositoryData.Create): Promise<TUserRepositoryData.Created> {
    this.data = data
    return this.resultCreate
  }
  async getByEmail(email: string): Promise<TUserRepositoryData.UserInfos | null> {
    this.email = email
    return this.resultGetByEmail
  }
  async getById(id: string): Promise<TUserRepositoryData.UserInfos | null> {
    this.id = id
    return this.resultGetById
  }
  async isUserActive(userID: string): Promise<boolean> {
    this.userID = userID
    return this.resultIsUserActive
  }
}
