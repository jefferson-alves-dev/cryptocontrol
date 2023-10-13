export class EmptyStringError extends Error {
  constructor(keyName: string | number) {
    super()
    this.name = 'EmptyStringError'
    this.message = `The provided key '${keyName}' value cannot be empty.`
  }
}
