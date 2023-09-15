import { IController } from '@presentation/protocols/contracts/controller'
import { Request, Response } from 'express'

export class RouteExpressAdapter {
  constructor(private readonly controller: IController) {}

  adapt = async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
    }
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      return res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      })
    }
  }
}
