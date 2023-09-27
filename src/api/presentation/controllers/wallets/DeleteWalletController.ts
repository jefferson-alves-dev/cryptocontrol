import { IWalletUsecase } from '@domain/usecases/wallet'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, noContent, notFound } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class DeleteWalletController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly walletService: IWalletUsecase,
  ) {}
  async handle(httpRequest: DeleteWalletController.Request): Promise<HttpResponse> {
    const validate = await this.validator.validate(httpRequest.params)
    if (validate.error) {
      return badRequest(validate.error)
    }
    const deleteWallet = await this.walletService.deleteById(httpRequest.params.walletID, httpRequest.userData.userID)
    if (deleteWallet.error) {
      return notFound(deleteWallet.error)
    }
    return noContent()
  }
}

export namespace DeleteWalletController {
  export type Request = {
    userData: {
      [key: string]: string
    }
    params: {
      walletID: string
    }
  }
}
