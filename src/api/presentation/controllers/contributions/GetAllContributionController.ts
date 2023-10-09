import { IContributionUsecase } from '@domain/usecases/contribution'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, serverError, success } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class GetAllContributionController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly contributionService: IContributionUsecase,
  ) {}
  async handle(httpRequest: GetAllContributionController.Request): Promise<HttpResponse> {
    try {
      const validate = await this.validator.validate(httpRequest.userData)
      if (validate.error) {
        return badRequest(validate.error)
      }

      const contribution = await this.contributionService.getAll(httpRequest.userData.userID)

      if (contribution.error) {
        return badRequest(contribution.error)
      }

      return success(contribution)
    } catch (error) {
      return serverError()
    }
  }
}

export namespace GetAllContributionController {
  export type Request = {
    userData: {
      [key: string]: string
    }
  }
}
