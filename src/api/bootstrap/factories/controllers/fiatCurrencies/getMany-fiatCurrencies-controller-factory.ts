import { FiatCurrencyRepositoryMongoDB } from '@infra/database/mongodb/repositories/FiatCurrencyRepositoryMongoDB'
import { GetManyFiatCurrenciesController } from '@presentation/controllers/fiatCurrency/GetManyFiatCurrenciesController'
import { IController } from '@presentation/protocols/contracts'
import { FiatCurrencyService } from '@services/usecases/FiatCurrencyService'

export const makeGetManyFiatCurrenciesController = (): IController => {
  const fiatCurrencyRepository = new FiatCurrencyRepositoryMongoDB()
  const fiatCurrencyService = new FiatCurrencyService(fiatCurrencyRepository)
  return new GetManyFiatCurrenciesController(fiatCurrencyService)
}
