import { FiatCurrencyRepositoryMongoDB } from '@infra/database/mongodb/repositories/FiatCurrencyRepositoryMongoDB'
import { JoiValidatorAdapter } from '@presentation/adapters'
import { GetOneFiatCurrenciesController } from '@presentation/controllers/fiatCurrency/GetOneFiatCurrenciesController'
import { IController } from '@presentation/protocols/contracts'
import { getFiatCurrencySchema } from '@presentation/validations/schemas/fiatCurrency'

export const makeGetOneFiatCurrencyController = (): IController => {
  const fiatCurrencyRepository = new FiatCurrencyRepositoryMongoDB()
  const validator = new JoiValidatorAdapter(getFiatCurrencySchema)
  return new GetOneFiatCurrenciesController(validator, fiatCurrencyRepository)
}
