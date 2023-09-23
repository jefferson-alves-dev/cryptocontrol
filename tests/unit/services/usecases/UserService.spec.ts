import { TUserUsecase } from '@domain/usecases/user'
import { faker } from '@faker-js/faker'
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

type TUserWithoutNull = Exclude<TUserUsecase.Result, null>
const makeFakerUser = (): TUserWithoutNull => ({
  id: faker.string.alphanumeric(24),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 10 }),
})

describe('UserService UseCases', () => {
  describe('getByEmail()', () => {
    it('should call userRepository.getByEmail() with correct email', async () => {
      const { sut, userRepository } = makeSut()
      const fakeEmail = makeFakerUser().email
      await sut.getByEmail(fakeEmail)
      expect(userRepository.email).toBe(fakeEmail)
    })

    it('should return null if userRepository.getByEmail() returns null', async () => {
      const { sut, userRepository } = makeSut()
      userRepository.resultGetByEmail = null
      const fakeEmail = makeFakerUser().email
      const result = await sut.getByEmail(fakeEmail)
      expect(result).toBe(null)
    })

    it('should return a user if userRepository.getByEmail() returns a user', async () => {
      const { sut, userRepository } = makeSut()
      const fakeUser = makeFakerUser()
      userRepository.resultGetByEmail = fakeUser
      const result = await sut.getByEmail(fakeUser.email)
      expect(result).toEqual(fakeUser)
      expect(result?.email).toBe(fakeUser.email)
    })
  })
})
