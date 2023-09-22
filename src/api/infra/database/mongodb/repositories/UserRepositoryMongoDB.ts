import { MongoDBClientSingleton } from '@infra/database/clients'
import { IUserRepository } from '@services/protocols/contracts/database/repositories'
import { TUserRepositoryData } from '@services/protocols/types'
import { ObjectId } from 'mongodb'

export class UserRepositoryMongoDB implements IUserRepository {
  async getByEmail(email: string): Promise<TUserRepositoryData.UserInfos | null> {
    const userCollection = await MongoDBClientSingleton.getCollection('users')
    const user = await userCollection.findOne(
      { email, isActive: true },
      { projection: { _id: 1, name: 1, email: 1, password: 1 } },
    )
    if (!user) return null
    const { _id } = user
    return {
      id: _id.toHexString(),
      name: user.name,
      email: user.email,
      password: user.password,
    }
  }

  async getById(id: string): Promise<TUserRepositoryData.UserInfos | null> {
    const userCollection = await MongoDBClientSingleton.getCollection('users')
    const user = await userCollection.findOne(
      { _id: new ObjectId(id), isActive: true },
      { projection: { _id: 1, name: 1, email: 1 } },
    )
    if (!user) return null
    const { _id } = user
    return {
      id: _id.toHexString(),
      name: user.name,
      email: user.email,
      password: user.password,
    }
  }

  async create(data: TUserRepositoryData.Create): Promise<TUserRepositoryData.Created> {
    const userCollection = await MongoDBClientSingleton.getCollection('users')
    const newUser = await userCollection.insertOne(data)
    return { id: newUser.insertedId.toHexString() }
  }

  async isUserActive(userID: string): Promise<boolean> {
    const userCollection = await MongoDBClientSingleton.getCollection('users')
    const user = await userCollection.findOne({ _id: new ObjectId(userID) }, { projection: { isActive: 1 } })
    return !!user?.isActive
  }
}
