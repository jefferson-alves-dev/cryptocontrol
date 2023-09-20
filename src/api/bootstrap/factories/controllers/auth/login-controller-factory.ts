import { BCryptAdapter, JwtAdapter } from '@infra/adapters/hasher'
import { UserRepositoryMongoDB } from '@infra/database/mongodb/repositories'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { LoginController } from '@presentation/controllers/auth'
import { IController } from '@presentation/protocols/contracts'
import { loginValidationSchema } from '@presentation/validations/schemas/auth'
import { UserService } from '@services/usecases/user'

export const makeLoginController = (): IController => {
  const tokenGenerator = new JwtAdapter()
  const hasher = new BCryptAdapter()
  const userRepository = new UserRepositoryMongoDB()
  const userService = new UserService(userRepository, hasher)
  const validator = new JoiValidatorAdapter(loginValidationSchema)
  return new LoginController(validator, userService, hasher, tokenGenerator)
}
