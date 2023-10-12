import { IWithdrawalUsecase } from '@domain/usecases/withdrawal'
import { badRequest, serverError, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class GetAllWithdrawalController implements IController {
  constructor(private readonly withdrawalService: IWithdrawalUsecase) {}
  async handle(httpRequest: GetAllWithdrawalController.Request): Promise<HttpResponse> {
    try {
      const withdrawal = await this.withdrawalService.getAll(httpRequest.userData.userID)

      if (withdrawal.error) {
        return badRequest(withdrawal.error)
      }

      return success(withdrawal.data)
    } catch (error) {
      return serverError()
    }
  }
}

export namespace GetAllWithdrawalController {
  export type Request = {
    userData: {
      [key: string]: string
    }
  }
}
