import { CryptoRepositoryMongoDB } from '@infra/database/mongodb/repositories/CryptoRepositoryMongoDB'
import { GetManyCryptoController } from '@presentation/controllers/crypto/GetManyCryptoController'
import { IController } from '@presentation/protocols/contracts'
import { CryptoService } from '@services/usecases/CryptoService'

export const makeGetManyContributionController = (): IController => {
  const cryptoRepository = new CryptoRepositoryMongoDB()
  const cryptoService = new CryptoService(cryptoRepository)
  return new GetManyCryptoController(cryptoService)
}
