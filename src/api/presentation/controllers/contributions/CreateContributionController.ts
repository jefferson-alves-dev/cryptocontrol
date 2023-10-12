import { TContribution } from '@domain/types'
import { IContributionUsecase } from '@domain/usecases/contribution'
import { IValidator } from '@presentation/adapters/protocols/contracts'
import { badRequest, created, serverError } from '@presentation/helpers'
import { IController } from '@presentation/protocols/contracts'
import { HttpResponse } from '@presentation/protocols/types'

export class CreateContributionController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly contributionService: IContributionUsecase,
  ) {}
  async handle(httpRequest: CreateContributionController.Request): Promise<HttpResponse> {
    try {
      const validate = await this.validator.validate(httpRequest.body)
      if (validate.error) {
        return badRequest(validate.error)
      }

      const contributionData = {
        ...httpRequest.body,
        userID: httpRequest.userData.userID,
      }

      const createContribution = await this.contributionService.create(contributionData)

      if (createContribution.error) {
        return badRequest(createContribution.error)
      }

      return created()
    } catch (error) {
      return serverError()
    }
  }
}

export namespace CreateContributionController {
  export type Request = {
    body: TContribution.Create
    userData: {
      [key: string]: string
    }
  }
}
