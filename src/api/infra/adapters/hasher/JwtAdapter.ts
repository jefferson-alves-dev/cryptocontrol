import { ITokenGenerator, TTokenGenerator } from '@domain/usecases/cryptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements ITokenGenerator {
  async generate(payload: TTokenGenerator.Payload, secret: string, expiresIn: string | number): Promise<string> {
    const token = jwt.sign(payload, secret, { expiresIn })
    return token
  }
}
