import { IContributionUsecase } from '@domain/usecases/contribution'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, serverError, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class GetByIdContributionController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly contributionService: IContributionUsecase,
  ) {}
  async handle(httpRequest: GetByIdContributionController.Request): Promise<HttpResponse> {
    try {
      const validate = await this.validator.validate(httpRequest.params)
      if (validate.error) {
        return badRequest(validate.error)
      }

      const contribution = await this.contributionService.getById(
        httpRequest.params.contributionID,
        httpRequest.userData.userID,
      )

      if (contribution.error) {
        return badRequest(contribution.error)
      }

      return success(contribution)
    } catch (error) {
      return serverError()
    }
  }
}

export namespace GetByIdContributionController {
  export type Request = {
    params: { contributionID: string }
    userData: {
      [key: string]: string
    }
  }
}
