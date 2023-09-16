export class InvalidEmailError extends Error {
  constructor(wrongValue: string | number) {
    super()
    this.name = 'InvalidEmailError'
    this.message = `The provided email address '${wrongValue}' is invalid. Please enter a valid email address and try again.`
  }
}
