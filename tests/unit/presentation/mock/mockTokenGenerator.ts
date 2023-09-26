import { ITokenGenerator, TTokenGenerator } from '@domain/usecases/cryptography'

export class TokenGeneratorSpy implements ITokenGenerator {
  playload: TTokenGenerator.Payload = {}
  secret: string = ''
  expiresIn: TTokenGenerator.ExpiresIn = ''
  returnGenerate: string = 'any_token'
  async generate(
    payload: TTokenGenerator.Payload,
    secret: string,
    expiresIn: TTokenGenerator.ExpiresIn,
  ): Promise<string> {
    this.playload = payload
    this.secret = secret
    this.expiresIn = expiresIn
    return this.returnGenerate
  }
}
