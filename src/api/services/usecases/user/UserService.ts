import { TUser } from '@domain/types'
import { IHasher } from '@domain/usecases/cryptography'
import { IUserUsecase, TUserUsecase } from '@domain/usecases/user'
import { UserAlreadyExistsError } from '@services/erros'
import { IUserRepository } from '@services/protocols/contracts/database/repositories/user'

export class UserService implements IUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}
  async getByEmail(email: string): Promise<TUserUsecase.Result> {
    const user = await this.userRepository.getByEmail(email)
    return user || null
  }

  async getById(id: string): Promise<TUserUsecase.Result> {
    const user = await this.userRepository.getById(id)
    return user || null
  }

  async create(userData: TUser.Create, hasher: IHasher): Promise<TUser.Result> {
    const { name, email, password } = userData
    const user = await this.userRepository.getByEmail(email)

    if (user) {
      return {
        error: new UserAlreadyExistsError(),
        data: null,
      }
    }

    const hashedPassword = await hasher.hash(password)

    const createUser = await this.userRepository.create({
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
