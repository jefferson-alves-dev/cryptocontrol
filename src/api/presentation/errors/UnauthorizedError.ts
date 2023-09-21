export class UnauthorizedError extends Error {
  constructor(messageError: string) {
    super()
    this.name = 'UnauthorizedError'
    this.message = messageError
  }
}
