export class UnexpectedKeyError extends Error {
  constructor(unexpectedKey: string) {
    super()
    this.name = 'UnexpectedKeyError'
    this.message = `The key '[${unexpectedKey}]' provided in the request body is unexpected. Please review the input and try again.`
  }
}
