import CONFIG from '@config/index'
import { ICheckUserExistsByEmailRepository } from '@services/protocols/contracts/database/user'
import { MongoClient } from 'mongodb'

export class CheckUserExistsByEmailMongoDB implements ICheckUserExistsByEmailRepository {
  private uri = CONFIG.DB_URI
  private client: MongoClient

  constructor() {
    this.client = new MongoClient(this.uri)
  }
  async check(email: string): Promise<boolean> {
    await this.client.connect()
    const collection = this.client.db().collection('users')
    const user = await collection.findOne({ email })
    await this.client.close()
    return !!user
  }
}
