import { UserService } from '@services/usecases'

import { UserRepositorySpy } from '../mocks'

type SutTypes = {
  sut: UserService
  userRepository: UserRepositorySpy
}

const makeSut = (): SutTypes => {
  const userRepository = new UserRepositorySpy()
  const sut = new UserService(userRepository)

  return {
    sut,
    userRepository,
  }
}

describe('UserService UseCases', () => {
  describe('getByEmail()', () => {
    it('should call userRepository.getByEmail() with correct email', async () => {
      const { sut, userRepository } = makeSut()
      await sut.getByEmail('valid-email@mail.com')
      expect(userRepository.email).toBe('valid-email@mail.com')
    })

    it('should return null if userRepository.getByEmail() returns null', async () => {
      const { sut, userRepository } = makeSut()
      userRepository.resultGetByEmail = null
      const result = await sut.getByEmail('invalid-email@mail.com')
      expect(result).toBe(null)
    })

    it('should return a user if userRepository.getByEmail() returns a user', async () => {
      const { sut, userRepository } = makeSut()
      userRepository.resultGetByEmail = {
        id: 'valid-id',
        name: 'valid-name',
        email: 'valid-email',
        password: 'valid-password',
      }
      const result = await sut.getByEmail('valid-email@mail.com')
      expect(result).toEqual({
        id: 'valid-id',
        name: 'valid-name',
        email: 'valid-email',
        password: 'valid-password',
      })
    })
  })
})
