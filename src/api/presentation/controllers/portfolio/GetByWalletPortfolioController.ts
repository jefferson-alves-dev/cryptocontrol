import { IPortfolioUsecase } from '@domain/usecases/portfolio'
import { badRequest, serverError, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class GetByWalletPortfolioController implements IController {
  constructor(private readonly portfolioService: IPortfolioUsecase) {}
  async handle(httpRequest: GetByWalletPortfolioController.Request): Promise<HttpResponse> {
    try {
      const portfolio = await this.portfolioService.getByWallet(httpRequest.body.walletID, httpRequest.userData.userID)

      if (portfolio.error) {
        return badRequest(portfolio.error)
      }

      return success(portfolio)
    } catch (error) {
      return serverError()
    }
  }
}

export namespace GetByWalletPortfolioController {
  export type Request = {
    body: { walletID: string }
    userData: {
      [key: string]: string
    }
  }
}
