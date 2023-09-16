export class GenericUnexpectedKeyError extends Error {
  constructor() {
    super()
    this.name = 'GenericUnexpectedKeyError'
    this.message = `An unexpected key was provided in the request body. Please review the input and try again.`
  }
}
