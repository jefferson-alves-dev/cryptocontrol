import { BCryptAdapter, JwtAdapter } from '@infra/adapters/hasher'
import { CheckUserExistsByEmailMongoDB, GetUserRepositoryMongoDB } from '@infra/database/mongodb/repositories'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { LoginController } from '@presentation/controllers/auth'
import { IController } from '@presentation/protocols/contracts'
import { loginValidationSchema } from '@presentation/validations/schemas/auth'
import { CheckUserExistsService, GetUserService } from '@services/usecases/user'

export const makeLoginController = (): IController => {
  const tokenGenerator = new JwtAdapter()
  const hashCompare = new BCryptAdapter()
  const checkUserExistsByEmailRepository = new CheckUserExistsByEmailMongoDB()
  const getUserRepository = new GetUserRepositoryMongoDB()
  const getUserService = new GetUserService(getUserRepository)
  const checkUserExistsService = new CheckUserExistsService(checkUserExistsByEmailRepository)
  const validator = new JoiValidatorAdapter(loginValidationSchema)
  return new LoginController(validator, checkUserExistsService, getUserService, hashCompare, tokenGenerator)
}
