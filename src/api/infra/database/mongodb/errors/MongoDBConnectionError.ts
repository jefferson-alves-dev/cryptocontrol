export class MongoDBConnectionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MongoDBConnectionError'
    this.message = message
  }
}
