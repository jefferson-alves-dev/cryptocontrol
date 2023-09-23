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
  })
})
