import { TUser } from '@domain/types'
import { IHasher } from '@domain/usecases/cryptography'
import { IUserUsecase, TUserUsecase } from '@domain/usecases/user'
import { HasherSpy } from '@tests/unit/infra/mocks'

export class UserServiceSpy implements IUserUsecase {
  userData: TUser.Create = {
    name: '',
    email: '',
    password: '',
  }
  hasher: IHasher = new HasherSpy()
  resultCreate: TUser.Result = {
    error: null,
    data: null,
  }

  userEmail: string = 'any_email'
  resultGetByEmail: TUserUsecase.Result | null = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  }

  userID: string = ''
  returnGetById: TUserUsecase.Result | null = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  }
  async create(userData: TUser.Create, hasher: IHasher): Promise<TUser.Result> {
    this.userData = userData
    this.hasher = hasher
    return this.resultCreate
  }

  async getByEmail(userEmail: string): Promise<TUserUsecase.Result> {
    this.userEmail = userEmail
    return this.resultGetByEmail
  }

  async getById(userID: string): Promise<TUserUsecase.Result> {
    this.userID = userID
    return this.returnGetById
  }
}
