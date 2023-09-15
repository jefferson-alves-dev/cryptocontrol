import { CheckUserExistsByEmailMongoDB, CreateUserRepositoryMongoDB } from '@infra/database/mongodb/repositories'
import { SignUpController } from '@presentation/controllers/auth'
import { IController } from '@presentation/protocols/contracts'
import { signupValidationSchema } from '@presentation/validations/schemas/auth'
import { CreateUserService } from '@services/usecases/auth/CreateUserService'
import bcrypt from 'bcrypt'

export const makeSignupController = (): IController => {
  const checkUserExistsByEmailRepository = new CheckUserExistsByEmailMongoDB()
  const createUserRepository = new CreateUserRepositoryMongoDB()
  const passwordEncrypt = bcrypt
  const createUserService = new CreateUserService(
    passwordEncrypt,
    createUserRepository,
    checkUserExistsByEmailRepository,
  )
  return new SignUpController(signupValidationSchema, createUserService)
}
