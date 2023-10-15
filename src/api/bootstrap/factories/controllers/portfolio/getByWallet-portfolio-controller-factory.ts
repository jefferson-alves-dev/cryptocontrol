import { PortfolioRepositoryMongoDB } from '@infra/database/mongodb/repositories/PortfolioRepositoryMongoDB'
import { GetByWalletPortfolioController } from '@presentation/controllers/portfolio'
import { IController } from '@presentation/protocols/contracts'
import { PortfolioService } from '@services/usecases'

export const makeGetByWalletPortfolioController = (): IController => {
  const portfolioRepository = new PortfolioRepositoryMongoDB()
  const portfolioService = new PortfolioService(portfolioRepository)
  return new GetByWalletPortfolioController(portfolioService)
}
