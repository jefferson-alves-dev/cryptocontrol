import { BCryptAdapter } from '@infra/adapters/hasher'
import { UserRepositoryMongoDB } from '@infra/database/mongodb/repositories'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { SignUpController } from '@presentation/controllers/auth'
import { IController } from '@presentation/protocols/contracts'
import { signupValidationSchema } from '@presentation/validations/schemas/auth'
import { UserService } from '@services/usecases/user'

export const makeSignupController = (): IController => {
  const userRepository = new UserRepositoryMongoDB()
  const hasher = new BCryptAdapter()
  const joiValidatorAdapter = new JoiValidatorAdapter(signupValidationSchema)
  const userService = new UserService(userRepository, hasher)
  return new SignUpController(joiValidatorAdapter, userService)
}
