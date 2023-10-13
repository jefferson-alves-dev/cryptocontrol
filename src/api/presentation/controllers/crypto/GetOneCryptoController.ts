import { ICryptoUsecase } from '@domain/usecases/crypto'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, notFound, serverError, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class GetOneCryptoController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly cryptoService: ICryptoUsecase,
  ) {}
  async handle(httpRequest: GetOneCryptoController.Request): Promise<HttpResponse> {
    try {
      const validate = await this.validator.validate(httpRequest.params)
      if (validate.error) {
        return badRequest(validate.error)
      }
      const crypto = await this.cryptoService.getOne(httpRequest.params.symbol)
      if (!crypto) return notFound(new Error('Crypto not found'))
      return success(crypto.data)
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
