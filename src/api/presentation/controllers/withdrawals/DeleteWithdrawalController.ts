import { IWithdrawalUsecase } from '@domain/usecases/withdrawal'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, noContent, serverError } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class DeleteWithdrawalController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly withdrawalService: IWithdrawalUsecase,
  ) {}
  async handle(httpRequest: DeleteWithdrawalController.Request): Promise<HttpResponse> {
    try {
      const validate = await this.validator.validate(httpRequest.body)
      if (validate.error) {
        return badRequest(validate.error)
      }

      const deleteWithdrawal = await this.withdrawalService.deleteById(
        httpRequest.body.withdrawalID,
        httpRequest.userData.userID,
      )

      if (deleteWithdrawal.error) {
        return badRequest(deleteWithdrawal.error)
      }

      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}

export namespace DeleteWithdrawalController {
  export type Request = {
    body: { withdrawalID: string }
    userData: {
      [key: string]: string
    }
  }
}
