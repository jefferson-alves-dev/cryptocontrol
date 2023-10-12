import { IWithdrawalUsecase } from '@domain/usecases/withdrawal'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, serverError, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class GetByIdWithdrawalController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly withdrawalService: IWithdrawalUsecase,
  ) {}
  async handle(httpRequest: GetByIdWithdrawalController.Request): Promise<HttpResponse> {
    try {
      const validate = await this.validator.validate(httpRequest.params)
      if (validate.error) {
        return badRequest(validate.error)
      }

      const withdrawal = await this.withdrawalService.getById(
        httpRequest.params.withdrawalID,
        httpRequest.userData.userID,
      )

      if (withdrawal.error) {
        return badRequest(withdrawal.error)
      }

      return success(withdrawal.data)
    } catch (error) {
      return serverError()
    }
  }
}

export namespace GetByIdWithdrawalController {
  export type Request = {
    params: { withdrawalID: string }
    userData: {
      [key: string]: string
    }
  }
}
