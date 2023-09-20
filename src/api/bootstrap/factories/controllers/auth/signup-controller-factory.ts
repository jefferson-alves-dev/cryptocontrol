import { BCryptAdapter } from '@infra/adapters/hasher'
import { CheckUserExistsByEmailMongoDB, CreateUserRepositoryMongoDB } from '@infra/database/mongodb/repositories'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { SignUpController } from '@presentation/controllers/auth'
import { IController } from '@presentation/protocols/contracts'
import { signupValidationSchema } from '@presentation/validations/schemas/auth'
import { CreateUserService } from '@services/usecases/user'

export const makeSignupController = (): IController => {
  const checkUserExistsByEmailRepository = new CheckUserExistsByEmailMongoDB()
  const createUserRepository = new CreateUserRepositoryMongoDB()
  const hasher = new BCryptAdapter()
  const joiValidatorAdapter = new JoiValidatorAdapter(signupValidationSchema)
  const createUserService = new CreateUserService(hasher, createUserRepository, checkUserExistsByEmailRepository)
  return new SignUpController(joiValidatorAdapter, createUserService)
}
