import CONFIG from '@config/index'
import { TUser } from '@domain/types'
import { ICreateUser } from '@domain/usecases/user'
import { ICheckUserExistsByEmailRepository, ICreateUserRepository } from '@services/protocols/contracts/database/user'

import { UserAlreadyExistsError } from '../../erros'

export class CreateUserService implements ICreateUser {
  constructor(
    private readonly passwordEncrypter: any,
    private readonly createUserRepository: ICreateUserRepository,
    private readonly checkUserExistsByEmailRepository: ICheckUserExistsByEmailRepository,
  ) {}
  async create(userData: TUser.Create): Promise<TUser.Result> {
    const { name, email, password } = userData
    const user = await this.checkUserExistsByEmailRepository.check(email)

    if (user) {
      return {
        error: new UserAlreadyExistsError(),
        data: null,
      }
    }

    const hashedPassword = await this.passwordEncrypter.hash(
      password + CONFIG.HASH_PASS_SECRET,
      Number(CONFIG.SALT_HASH),
    )

    const createUser = await this.createUserRepository.create({
      name,
      email,
      password: hashedPassword,
      isActive: true,
      createdAt: new Date().getTime(),
      updatedAt: null,
      desactivatedAt: null,
    })

    return { error: null, data: { id: createUser.id } }
  }
}
