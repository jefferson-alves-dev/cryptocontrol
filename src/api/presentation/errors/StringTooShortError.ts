export class StringTooShortError extends Error {
  constructor(wrongValue: string | number, minimumLength: number) {
    super()
    this.name = 'StringTooShortError'
    this.message = `The provided string '${wrongValue}' is shorter than the minimum required length of ${minimumLength} characters. Please extend it and try again.`
  }
}
