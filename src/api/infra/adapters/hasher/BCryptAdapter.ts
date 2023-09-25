import { IHasher } from '@domain/usecases/cryptography'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements IHasher {
  async hash(textPlain: string, hashSecret: string, salt: number): Promise<string> {
    const textHashed = await bcrypt.hash(textPlain + hashSecret, salt)
    return textHashed
  }

  async compare(textPlain: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(textPlain, hash)
    return result
  }
}
