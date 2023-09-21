import { TUser } from '@domain/types'
import { MongoDBClientSingleton } from '@infra/database/clients'
import { IUserRepository } from '@services/protocols/contracts/database/repositories'
import { TUserRepositoryData } from '@services/protocols/types'
import { ObjectId } from 'mongodb'

export class UserRepositoryMongoDB implements IUserRepository {
  async getByEmail(email: string): Promise<TUser.Full | null> {
    const userCollection = await MongoDBClientSingleton.getCollection('users')
    const user = await userCollection.findOne({ email })
    if (!user) return null
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

  async getById(id: string): Promise<TUser.Full | null> {
    const userCollection = await MongoDBClientSingleton.getCollection('users')
    const user = await userCollection.findOne({ _id: new ObjectId(id) })
    if (!user) return null
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

  async create(data: TUserRepositoryData.Create): Promise<TUserRepositoryData.Created> {
    const userCollection = await MongoDBClientSingleton.getCollection('users')
    const newUser = await userCollection.insertOne(data)
    return { id: newUser.insertedId.toHexString() }
  }

  async isUserActive(userID: string): Promise<boolean> {
    const userCollection = await MongoDBClientSingleton.getCollection('users')
    const user = await userCollection.findOne({ _id: new ObjectId(userID) })
    return !!user?.isActive
  }
}
