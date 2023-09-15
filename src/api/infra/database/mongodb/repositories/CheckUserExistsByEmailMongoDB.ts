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
    const startTime = Date.now()
    const startTimeConnection = Date.now()
    await this.client.connect()
    const endTimeConnection = Date.now()

    const startTimeSearchUser = Date.now()
    const collection = this.client.db().collection('users')
    const userCount = await collection.countDocuments({ email })
    const endTimeSearchUser = Date.now()

    const startTimeCloseConnection = Date.now()
    await this.client.close()
    const endTimeCloseConnection = Date.now()
    const endTime = Date.now()

    console.log(`Tempo para abrir conexão com o MongoDB: ${endTimeConnection - startTimeConnection}ms`)
    console.log(`Tempo para encontrar o usuário MongoDB: ${endTimeSearchUser - startTimeSearchUser}ms`)
    console.log(`Tempo para fechar conexão com MongoDB: ${endTimeCloseConnection - startTimeCloseConnection}ms`)
    console.log('Tempo total: ' + (endTime - startTime) + 'ms')
    console.log('💤💤💤💤💤💤💤💤💤💤💤💤💤💤💤💤')
    return userCount > 0 ? true : false
  }
}
