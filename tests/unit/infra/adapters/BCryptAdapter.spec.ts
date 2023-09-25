import { BCryptAdapter } from '@infra/adapters/hasher'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hash'
  },

  async compare(): Promise<boolean> {
    return true
  },
}))

const salt = 12
const hashSecret = 'any_hash_secret'
const makeSut = (): BCryptAdapter => {
  return new BCryptAdapter()
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('should call hash() with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value', hashSecret, salt)
      expect(hashSpy).toHaveBeenCalledWith('any_value' + hashSecret, salt)
    })
  })
})
