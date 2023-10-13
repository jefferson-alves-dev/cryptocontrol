import { ICryptoUsecase } from '@domain/usecases/crypto'
import { notFound, serverError, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class GetManyCryptoController implements IController {
  constructor(private readonly cryptoService: ICryptoUsecase) {}
  async handle(): Promise<HttpResponse> {
    try {
      const cryptos = await this.cryptoService.getAll()
      if (!cryptos) return notFound(new Error('Cryptos not found'))
      return success(cryptos.data)
    } catch (error) {
      return serverError()
    }
  }
}
