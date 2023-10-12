import { TWithdrawal } from '@domain/types'
import { IWithdrawalUsecase } from '@domain/usecases/withdrawal'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, created, serverError } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class CreateWithdrawalController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly withdrawalService: IWithdrawalUsecase,
  ) {}
  async handle(httpRequest: CreateWithdrawalController.Request): Promise<HttpResponse> {
    try {
      const validate = await this.validator.validate(httpRequest.body)
      if (validate.error) {
        return badRequest(validate.error)
      }

      const withdrawalData = {
        ...httpRequest.body,
        userID: httpRequest.userData.userID,
      }

      const createWithdrawal = await this.withdrawalService.create(withdrawalData)

      if (createWithdrawal.error) {
        return badRequest(createWithdrawal.error)
      }

      return created()
    } catch (error) {
      return serverError()
    }
  }
}

export namespace CreateWithdrawalController {
  export type Request = {
    body: TWithdrawal.Create
    userData: {
      [key: string]: string
    }
  }
}
