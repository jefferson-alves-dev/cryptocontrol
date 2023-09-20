import { MongoDBClientSingleton } from '@infra/database/clients'
import { ICheckUserExistsByEmailRepository } from '@services/protocols/contracts/database/repositories/user'

export class CheckUserExistsByEmailMongoDB implements ICheckUserExistsByEmailRepository {
  async check(email: string): Promise<boolean> {
    const userCollection = await MongoDBClientSingleton.getCollection('users')
    const countUser = await userCollection.countDocuments({ email })
    return countUser > 0 ? true : false
  }
}
