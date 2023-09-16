export class StringLengthExceededError extends Error {
  constructor(wrongValue: string | number, maximumLength: number) {
    super()
    this.name = 'StringLengthExceededError'
    this.message = `The provided string '${wrongValue}' exceeds the maximum allowed length of ${maximumLength} characters. Please shorten it and try again.`
  }
}
