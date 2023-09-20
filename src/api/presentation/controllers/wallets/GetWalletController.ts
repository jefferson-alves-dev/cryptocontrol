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
    const validate = await this.validator.validate(httpRequest)
    if (validate.error) {
      return badRequest(validate.error)
    }
    const userID = '123teste'
    const wallet = await this.walletService.getById(httpRequest.walletID, userID)
    return success(wallet)
  }
}

export namespace GetWalletController {
  export type Request = {
    walletID: string
  }
}
