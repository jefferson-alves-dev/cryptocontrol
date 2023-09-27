import { IWalletUsecase } from '@domain/usecases/wallet'
import { MissingParameterError } from '@presentation/errors'
import { badRequest, serverError, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class GetAllWalletsControler implements IController {
  constructor(private readonly walletService: IWalletUsecase) {}
  async handle(httpRequest: GetAllWalletsControler.Request): Promise<HttpResponse> {
    try {
      if (!httpRequest?.userData?.userID) return badRequest(new MissingParameterError('userID'))
      const wallet = await this.walletService.getAll(httpRequest.userData.userID)
      return success(wallet)
    } catch (error) {
      return serverError()
    }
  }
}

export namespace GetAllWalletsControler {
  export type Request = {
    userData: {
      [key: string]: string
    }
  }
}
