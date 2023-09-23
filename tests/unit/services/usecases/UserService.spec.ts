import { TUserUsecase } from '@domain/usecases/user'
import { faker } from '@faker-js/faker'
import { UserAlreadyExistsError } from '@services/erros'
import { UserService } from '@services/usecases'
import { throwError } from '@tests/helpers'
import { HasherSpy } from '@tests/unit/infra/mock'

import { UserRepositorySpy } from '../mocks'

type SutTypes = {
  sut: UserService
  userRepository: UserRepositorySpy
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const userRepository = new UserRepositorySpy()
  const hasherSpy = new HasherSpy()
  const sut = new UserService(userRepository)

  return {
    sut,
    userRepository,
    hasherSpy,
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

  describe('getById()', () => {
    it('should call userRepository.getById() with correct userID', async () => {
      const { sut, userRepository } = makeSut()
      const fakerUserID = makeFakerUser().id
      await sut.getById(fakerUserID)
      expect(userRepository.id).toBe(fakerUserID)
    })

    it('should return null if userRepository.getById() returns null', async () => {
      const { sut, userRepository } = makeSut()
      userRepository.resultGetById = null
      const fakerUserID = makeFakerUser().id
      const result = await sut.getById(fakerUserID)
      expect(result).toBe(null)
    })

    it('should return a user if userRepository.getById() returns a user', async () => {
      const { sut, userRepository } = makeSut()
      const fakeUser = makeFakerUser()
      userRepository.resultGetById = fakeUser
      const result = await sut.getById(fakeUser.id)
      expect(result).toEqual(fakeUser)
      expect(result?.id).toBe(fakeUser.id)
    })
  })

  describe('create()', () => {
    it('should call userRepository.getByEmail() with correct email', async () => {
      const { sut, userRepository, hasherSpy } = makeSut()
      const { name, email, password } = makeFakerUser()
      await sut.create({ name, email, password }, hasherSpy)
      expect(userRepository.email).toBe(email)
    })

    it('should return correct result if userRepository.getByEmail() returns a user', async () => {
      const { sut, userRepository, hasherSpy } = makeSut()
      const fakeUseData = makeFakerUser()
      const { name, email, password } = fakeUseData
      userRepository.resultGetByEmail = fakeUseData
      const result = await sut.create({ name, email, password }, hasherSpy)
      expect(result.error).toEqual(new UserAlreadyExistsError())
      expect(result.error?.message).toBe('User already exists')
      expect(result.data).toBe(null)
    })

    it('should call userRepository.create() with correct values', async () => {
      const { sut, userRepository, hasherSpy } = makeSut()
      const fakeUseData = makeFakerUser()
      const { name, email, password } = fakeUseData
      userRepository.resultGetByEmail = null
      await sut.create({ name, email, password }, hasherSpy)
      const hashedPassword = await hasherSpy.hash(password)
      expect(userRepository.data).toEqual({
        name,
        email,
        password: hashedPassword,
        isActive: true,
        createdAt: new Date().getTime(),
        updatedAt: null,
        desactivatedAt: null,
      })
    })

    it('should return correct result on userRepository.create() success', async () => {
      const { sut, userRepository, hasherSpy } = makeSut()
      const fakeUseData = makeFakerUser()
      const { name, email, password } = fakeUseData
      userRepository.resultGetByEmail = null
      userRepository.resultCreate = {
        id: faker.string.alphanumeric(24),
      }
      const result = await sut.create({ name, email, password }, hasherSpy)
      expect(typeof result.data?.id).toBe('string')
      expect(result.error).toBe(null)
    })
  })

  describe('throws', () => {
    it('should throw if userRepository.getByEmail() throws', async () => {
      const { sut, userRepository } = makeSut()
      jest.spyOn(userRepository, 'getByEmail').mockImplementationOnce(throwError)
      const promise = sut.getByEmail(makeFakerUser().email)
      await expect(promise).rejects.toThrow()
    })
  })
})
