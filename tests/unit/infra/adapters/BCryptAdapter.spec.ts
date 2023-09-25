import { BCryptAdapter } from '@infra/adapters/hasher'
import { throwError } from '@tests/helpers'
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

    test('should return hashed value on hash() success', async () => {
      const sut = makeSut()
      const result = await sut.hash('any_value', hashSecret, salt)
      expect(typeof result).toBe('string')
      expect(result).not.toBe('any_value' + hashSecret)
      expect(result).toBe('hash')
    })
  })

  describe('compare()', () => {
    test('should return true when compare() succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(true)
    })

    test('should return false when compare() fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(false)
    })
  })

  describe('throws', () => {
    test('Should throw if compare() throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if hash() throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
      const promise = sut.hash('any_value', hashSecret, salt)
      await expect(promise).rejects.toThrow()
    })
  })
})
