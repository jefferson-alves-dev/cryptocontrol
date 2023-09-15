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
  async create(userData: TUser.Create): Promise<TUser.Created> {
    const { name, email, password } = userData
    const user = await this.checkUserExistsByEmailRepository.check(email)

    if (user) {
      throw new UserAlreadyExistsError()
    }

    const hashedPassword = await this.passwordEncrypter.hash(
      password + CONFIG.HASH_PASS_SECRET,
      Number(CONFIG.SALT_HASH),
    )

    return await this.createUserRepository.create({
      name,
      email,
      password: hashedPassword,
      isActive: true,
      createdAt: new Date().getTime(),
      updatedAt: null,
      desactivatedAt: null,
    })
  }
}
