import { TUser } from '@domain/types'
import { MongoDBClientSingleton } from '@infra/database/clients'
import { IGetUserRepository } from '@services/protocols/contracts/database/repositories/user'

export class GetUserRepositoryMongoDB implements IGetUserRepository {
  async getByEmail(email: string): Promise<TUser.Full> {
    const userCollection = await MongoDBClientSingleton.getCollection('users')
    const user = await userCollection.findOne({ email })
    if (!user) {
      throw new Error('User not found by email: ' + email)
    }
    const { _id } = user
    return {
      id: _id.toHexString(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      isActive: user.isActive,
      updatedAt: user.updatedAt,
      desactivatedAt: user.desactivatedAt,
    }
  }
}
