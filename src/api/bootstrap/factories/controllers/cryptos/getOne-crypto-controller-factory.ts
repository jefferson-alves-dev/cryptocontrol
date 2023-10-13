import { CryptoRepositoryMongoDB } from '@infra/database/mongodb/repositories/CryptoRepositoryMongoDB'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { GetOneCryptoController } from '@presentation/controllers/crypto/GetOneCryptoController'
import { IController } from '@presentation/protocols/contracts'
import { getCryptoSchema } from '@presentation/validations/schemas/crypto'
import { CryptoService } from '@services/usecases/CryptoService'

export const makeGetOneContributionController = (): IController => {
  const cryptoRepository = new CryptoRepositoryMongoDB()
  const cryptoService = new CryptoService(cryptoRepository)
  const validator = new JoiValidatorAdapter(getCryptoSchema)
  return new GetOneCryptoController(validator, cryptoService)
}
