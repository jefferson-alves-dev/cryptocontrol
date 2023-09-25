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

describe('Jwt Adapter', () => {
  describe('generate()', () => {
    test('should call generate() with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.generate(payload, 'any_secret', '1h')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'any_secret', { expiresIn: '1h' })
    })

    test('should return a string on jwt.sign() success', async () => {
      const sut = makeSut()
      const result = await sut.generate(payload, 'any_secret', '1h')
      expect(typeof result).toBe('string')
      expect(result).toBeTruthy()
    })
  })

  describe('throws', () => {
    test('Should throw if jwt.sign() throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.generate(payload, 'any_secret', '1h')
      await expect(promise).rejects.toThrow()
    })
  })
})
