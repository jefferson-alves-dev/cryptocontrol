import { JwtAdapter } from '@infra/adapters/hasher'
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

describe('Jwt Adapter', () => {
  describe('generate()', () => {
    test('should call generate() with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      const payload = { id: 'any_id' }
      await sut.generate(payload, 'any_secret', '1h')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'any_secret', { expiresIn: '1h' })
    })
  })
})
