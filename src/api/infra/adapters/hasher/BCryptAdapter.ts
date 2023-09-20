import CONFIG from '@config/index'
import { IHasherCompare } from '@domain/usecases/cryptography'
import { IHasher } from '@services/protocols/contracts/hasher'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements IHasher, IHasherCompare {
  async hash(textPlain: string): Promise<string> {
    const _salt = CONFIG.SALT_HASH
    const hashSecret = CONFIG.HASH_PASS_SECRET
    const textHashed = await bcrypt.hash(textPlain + hashSecret, _salt)
    return textHashed
  }

  async compare(textPlain: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(textPlain, hash)
    return result
  }
}
