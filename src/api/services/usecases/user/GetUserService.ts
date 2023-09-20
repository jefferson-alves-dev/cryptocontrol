import { TUser } from '@domain/types'
import { IGetUser } from '@domain/usecases/user'
import { IGetUserRepository } from '@services/protocols/contracts/database/repositories/user'

export class GetUserService implements IGetUser {
  constructor(private readonly getUserRepository: IGetUserRepository) {}
  async getByEmail(email: string): Promise<TUser.Full> {
    const user = await this.getUserRepository.getByEmail(email)
    return user
  }
}
