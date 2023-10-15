import { IPortfolioUsecase } from '@domain/usecases/portfolio'
import { IPortfolioRepository } from '@services/protocols/contracts/database/repositories'

export class PortfolioService implements IPortfolioUsecase {
  constructor(private readonly portfolioRepository: IPortfolioRepository) {}
  async getByWallet(walletID: string, userID: string): Promise<any> {
    return await this.portfolioRepository.getByWallet(walletID, userID)
  }
}
