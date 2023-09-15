import CONFIG from '@config/index'
import { ICreateUserRepository } from '@services/protocols/contracts/database/user'
import { TUserRepositoryData } from '@services/protocols/types'
import { MongoClient } from 'mongodb'

export class CreateUserRepositoryMongoDB implements ICreateUserRepository {
  private uri = CONFIG.DB_URI
  private client: MongoClient

  constructor() {
    this.client = new MongoClient(this.uri)
  }
  async create(data: TUserRepositoryData.Create): Promise<TUserRepositoryData.Created> {
    await this.client.connect()
    const collection = this.client.db().collection('users')
    const newUser = await collection.insertOne(data)
    await this.client.close()
    return { id: newUser.insertedId.toHexString() }
  }
}
