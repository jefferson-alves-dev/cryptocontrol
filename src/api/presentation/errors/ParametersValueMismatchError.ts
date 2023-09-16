export class ParametersValueMismatchError extends Error {
  constructor(firtsValue: any, secondValue: any) {
    super()
    this.name = 'ParametersValueMismatchError'
    this.message = `The provided values of parameters ${firtsValue} and ${secondValue} do not match as expected. Please ensure the values are identical and try again.`
  }
}
