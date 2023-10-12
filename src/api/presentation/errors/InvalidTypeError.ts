export class InvalidTypeError extends Error {
  constructor(parameterName: string, currentType: string, expectedType: string) {
    super()
    this.name = 'InvalidTypeError'
    this.message = `The provided type of parameters '${parameterName}' is ${currentType}. The expected type must be ${expectedType}.`
  }
}
