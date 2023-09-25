import { JwtAdapter } from '@infra/adapters/hasher'
import { throwError } from '@tests/helpers'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return 'any_token'
  },

  async verify(): Promise<string> {
    return 'any_value'
  },
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter()
}

const payload = { id: 'any_id' }
const expiresIn = '1h'
const secret = 'any_secret'

describe('Jwt Adapter', () => {
  describe('generate()', () => {
    test('should call generate() with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.generate(payload, secret, expiresIn)
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, secret, { expiresIn })
    })

    test('should return a string on jwt.sign() success', async () => {
      const sut = makeSut()
      const result = await sut.generate(payload, secret, expiresIn)
      expect(typeof result).toBe('string')
      expect(result).toBeTruthy()
    })
  })

  describe('throws', () => {
    test('Should throw if jwt.sign() throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.generate(payload, secret, expiresIn)
      await expect(promise).rejects.toThrow()
    })
  })
})
