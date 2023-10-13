import { IFiatCurrencyUsecase } from '@domain/usecases/fiatCurrency'
import { notFound, serverError, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class GetManyFiatCurrenciesController implements IController {
  constructor(private readonly fiatCurrencyService: IFiatCurrencyUsecase) {}
  async handle(): Promise<HttpResponse> {
    try {
      const fiats = await this.fiatCurrencyService.getAll()
      if (!fiats) return notFound(new Error('Fiats not found'))
      return success(fiats.data)
    } catch (error) {
      return serverError()
    }
  }
}
