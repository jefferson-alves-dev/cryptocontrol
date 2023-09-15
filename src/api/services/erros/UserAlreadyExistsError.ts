export class UserAlreadyExistsError extends Error {
  constructor() {
    super()
    this.name = 'UserAlreadyExistsError'
    this.message = 'User already exists'
  }
}
