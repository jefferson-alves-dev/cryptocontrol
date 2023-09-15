import { MongoDBClientSingleton } from '@infra/database/clients'
import { ICreateUserRepository } from '@services/protocols/contracts/database/user'
import { TUserRepositoryData } from '@services/protocols/types'

export class CreateUserRepositoryMongoDB implements ICreateUserRepository {
  async create(data: TUserRepositoryData.Create): Promise<TUserRepositoryData.Created> {
    const userCollection = await MongoDBClientSingleton.getCollection('users')
    const newUser = await userCollection.insertOne(data)
    return { id: newUser.insertedId.toHexString() }
  }
}
