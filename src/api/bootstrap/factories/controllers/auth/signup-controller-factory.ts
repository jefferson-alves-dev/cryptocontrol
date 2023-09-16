import { CheckUserExistsByEmailMongoDB, CreateUserRepositoryMongoDB } from '@infra/database/mongodb/repositories'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { SignUpController } from '@presentation/controllers/auth'
import { IController } from '@presentation/protocols/contracts'
import { signupValidationSchema } from '@presentation/validations/schemas/auth'
import { CreateUserService } from '@services/usecases/auth/CreateUserService'
import bcrypt from 'bcrypt'

export const makeSignupController = (): IController => {
  const checkUserExistsByEmailRepository = new CheckUserExistsByEmailMongoDB()
  const createUserRepository = new CreateUserRepositoryMongoDB()
  const passwordEncrypt = bcrypt
  const joiValidatorAdapter = new JoiValidatorAdapter(signupValidationSchema)
  const createUserService = new CreateUserService(
    passwordEncrypt,
    createUserRepository,
    checkUserExistsByEmailRepository,
  )
  return new SignUpController(joiValidatorAdapter, createUserService)
}
