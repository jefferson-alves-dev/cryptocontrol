import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, notFound, serverError, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'
import { IFiatCurrencyRepository } from '@services/protocols/contracts/database/repositories/fiat-currency-repository'

export class GetOneFiatCurrenciesController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly fiatCurrencyRepository: IFiatCurrencyRepository,
  ) {}
  async handle(httpRequest: GetOneCryptoController.Request): Promise<HttpResponse> {
    try {
      const validate = await this.validator.validate(httpRequest.params)
      if (validate.error) {
        return badRequest(validate.error)
      }
      const fiat = await this.fiatCurrencyRepository.getOne(httpRequest.params.symbol)
      if (!fiat) return notFound(new Error('Fiat not found'))
      return success(fiat)
    } catch (error) {
      return serverError()
    }
  }
}

export namespace GetOneCryptoController {
  export type Request = {
    userData: {
      [key: string]: string
    }
    params: {
      symbol: string
    }
  }
}
