import { IWalletUsecase } from '@domain/usecases/wallet'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class GetWalletController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly walletService: IWalletUsecase,
  ) {}
  async handle(httpRequest: GetWalletController.Request): Promise<HttpResponse> {
    const validate = await this.validator.validate(httpRequest.params)
    if (validate.error) {
      return badRequest(validate.error)
    }
    const wallet = await this.walletService.getById(httpRequest.params.walletID, httpRequest.userData.userID)
    return success(wallet)
  }
}

export namespace GetWalletController {
  export type Request = {
    userData: {
      [key: string]: string
    }
    params: {
      walletID: string
    }
    body: {
      [key: string]: string
    }
  }
}
