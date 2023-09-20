import { ICheckUserExists, TCheckUserExists } from '@domain/usecases/user'
import { ICheckUserExistsByEmailRepository } from '@services/protocols/contracts/database/repositories/user'

export class CheckUserExistsService implements ICheckUserExists {
  constructor(private readonly checkUserExistsByEmailRepository: ICheckUserExistsByEmailRepository) {}

  async checkByEmail(email: string): Promise<TCheckUserExists.Result> {
    const userExists = await this.checkUserExistsByEmailRepository.check(email)
    return !!userExists
  }
}
