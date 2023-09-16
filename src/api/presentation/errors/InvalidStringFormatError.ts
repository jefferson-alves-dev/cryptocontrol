export class InvalidStringFormatError extends Error {
  constructor(wrongValue: string | number) {
    super()
    this.name = 'InvalidStringFormatError'
    this.message = `The provided string '${wrongValue}' does not match the expected pattern. Please ensure the input is in the correct format and try again.`
  }
}
