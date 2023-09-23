import { IHasher } from '@domain/usecases/cryptography'

export class HasherSpy implements IHasher {
  textPlain: string = ''
  _hash: string = ''
  compareResult: boolean = true
  hashResult: string = ''
  async compare(textPlain: string, hash: string): Promise<boolean> {
    this.textPlain = textPlain
    this._hash = hash
    return this.compareResult
  }

  async hash(textPlain: string): Promise<string> {
    this.textPlain = textPlain
    return this.hashResult
  }
}
