import { IValidator, TValidator } from '@presentation/adapters/protocols/contracts'

export class ValidatorSpy implements IValidator {
  data: any = {}
  resultValidate: TValidator.Result = { error: null }
  async validate(data: any): Promise<TValidator.Result> {
    this.data = data
    return this.resultValidate
  }
}
