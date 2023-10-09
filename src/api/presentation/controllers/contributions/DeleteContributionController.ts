import { IContributionUsecase } from '@domain/usecases/contribution'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, noContent, serverError } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class DeleteContributionController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly contributionService: IContributionUsecase,
  ) {}
  async handle(httpRequest: DeleteContributionController.Request): Promise<HttpResponse> {
    try {
      const validate = await this.validator.validate(httpRequest.body)
      if (validate.error) {
        return badRequest(validate.error)
      }

      const deleteContribution = await this.contributionService.deleteById(
        httpRequest.body.contributionID,
        httpRequest.userData.userID,
      )

      if (deleteContribution.error) {
        return badRequest(deleteContribution.error)
      }

      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}

export namespace DeleteContributionController {
  export type Request = {
    body: { contributionID: string }
    userData: {
      [key: string]: string
    }
  }
}
