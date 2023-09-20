import CONFIG from '@config/index'
import { IHasherCompare, ITokenGenerator } from '@domain/usecases/cryptography'
import { ICheckUserExists, IGetUser } from '@domain/usecases/user'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class LoginController implements IController {
  constructor(
    private readonly validator: IValidator<LoginController.Request>,
    private readonly checkUserExistsService: ICheckUserExists,
    private readonly getUserService: IGetUser,
    private readonly hasherCompare: IHasherCompare,
    private readonly tokenGenerator: ITokenGenerator,
  ) {}
  async handle(httpRequest: any): Promise<HttpResponse> {
    const validateRequest = await this.validator.validate(httpRequest)
    if (validateRequest.error) {
      return badRequest(validateRequest.error)
    }

    const { email, password } = httpRequest
    const userExists = await this.checkUserExistsService.checkByEmail(email)
    if (!userExists) {
      return badRequest(new Error('User not found'))
    }

    const user = await this.getUserService.getByEmail(email)

    const isValidPassword = await this.hasherCompare.compare(password + CONFIG.HASH_PASS_SECRET, user.password)
    if (!isValidPassword) {
      return badRequest(new Error('Invalid password'))
    }

    const token = await this.tokenGenerator.generate({ id: user.id }, CONFIG.TOKEN_SECRET, CONFIG.TOKEN_EXPIRATION)
    return success({ token })
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
