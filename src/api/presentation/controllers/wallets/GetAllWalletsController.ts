import { IWalletUsecase } from '@domain/usecases/wallet'
import { success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class GetAllWalletsControler implements IController {
  constructor(private readonly walletService: IWalletUsecase) {}
  async handle(): Promise<HttpResponse> {
    const userID = '123teste'
    const wallet = await this.walletService.getAll(userID)
    return success(wallet)
  }
}
