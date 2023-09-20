import CONFIG from '@config/index'
import { IHasher, ITokenGenerator } from '@domain/usecases/cryptography'
import { IUserUsecase } from '@domain/usecases/user'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class LoginController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly userService: IUserUsecase,
    private readonly hasherCompare: IHasher,
    private readonly tokenGenerator: ITokenGenerator,
  ) {}
  async handle(httpRequest: any): Promise<HttpResponse> {
    const validateRequest = await this.validator.validate(httpRequest)
    if (validateRequest.error) {
      return badRequest(validateRequest.error)
    }

    const { email, password } = httpRequest

    const user = await this.userService.getByEmail(email)
    if (!user) return badRequest(new Error('User not found'))

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
