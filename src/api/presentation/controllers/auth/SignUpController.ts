import { ICreateUser } from '@domain/usecases/user'
import { badRequest, conflict, created, serverError } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts/controller'
import { HttpResponse } from '@presentation/protocols/types/http'
import { UserAlreadyExistsError } from '@services/erros'
import Joi from 'joi'

export class SignUpController implements IController {
  constructor(
    private readonly signupSchemaValidation: Joi.ObjectSchema,
    private readonly createUserService: ICreateUser,
  ) {}
  async handle(httpRequest: SignUpController.Request): Promise<HttpResponse> {
    if (httpRequest.password !== httpRequest.passwordConfirmation) {
      return badRequest(new Error('Password and password confirmation do not match'))
    }
    try {
      await this.signupSchemaValidation.validateAsync(httpRequest)
      const user = await this.createUserService.create(httpRequest)
      if (user) {
        return created()
      } else {
        return badRequest(new Error('User could not be created'))
      }
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        return badRequest(error)
      }
      if (error instanceof UserAlreadyExistsError) {
        return conflict(error)
      }
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
