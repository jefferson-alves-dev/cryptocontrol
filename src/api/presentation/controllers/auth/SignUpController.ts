import { ICreateUser } from '@domain/usecases/user'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, created, serverError } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts/controller'
import { HttpResponse } from '@presentation/protocols/types/http'

export class SignUpController implements IController {
  constructor(
    private readonly validator: IValidator<SignUpController.Request>,
    private readonly createUserService: ICreateUser,
  ) {}
  async handle(httpRequest: SignUpController.Request): Promise<HttpResponse> {
    console.log(new Date().getTime())

    try {
      const validateRequest = await this.validator.validate(httpRequest)
      if (validateRequest.error) {
        return badRequest(validateRequest.error)
      }
      const createUser = await this.createUserService.create(httpRequest)
      if (createUser.error) {
        return badRequest(createUser.error)
      }
      return created()
    } catch (error) {
      return serverError()
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
