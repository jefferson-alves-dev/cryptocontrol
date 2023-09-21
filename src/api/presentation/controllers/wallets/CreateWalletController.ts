import { IWalletUsecase } from '@domain/usecases/wallet'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class CreateWalletController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly walletService: IWalletUsecase,
  ) {}
  async handle(httpRequest: CreateWalletController.Request): Promise<HttpResponse> {
    const validate = await this.validator.validate(httpRequest.body)
    if (validate.error) {
      return badRequest(validate.error)
    }

    const wallet = await this.walletService.create({
      name: httpRequest.body.name,
      userID: httpRequest.userData.userID,
    })
    return success(wallet)
  }
}

export namespace CreateWalletController {
  export type Request = {
    body: {
      name: string
    }
    userData: {
      [key: string]: string
    }
  }
}
