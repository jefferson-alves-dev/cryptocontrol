export interface IValidator {
  validate(data: any): Promise<TValidator.Result>
}

export namespace TValidator {
  export type Result = {
    error: Error | null | undefined
    value: any
  }
}
