export class MissingParameterError extends Error {
  constructor(private readonly wrongValue: string | number) {
    super()
    this.name = 'MissingParameterError'
    this.message = `Missing parameter: ${this.wrongValue}`
  }
}
