export interface IValidator<T> {
  validate(data: T): Promise<TValidator.Result>
}

export namespace TValidator {
  export type Result = {
    error: Error | null | undefined
    value: any
    isValid: boolean
  }
}
