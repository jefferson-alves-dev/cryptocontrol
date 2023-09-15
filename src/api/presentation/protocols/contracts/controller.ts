import { HttpResponse } from '@presentation/protocols/types'

export interface IController {
  handle(httpRequest: any): Promise<HttpResponse>
}
