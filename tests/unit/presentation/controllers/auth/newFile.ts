import { makeFakeRequest, makeSut } from './LoginController.spec'

describe('LoginController', () => {
  describe('validator', () => {
    it('should call validator.validate() with correct values', async () => {
      const { sut, validatorSpy } = makeSut()
      const httpRequest = makeFakeRequest()
      await sut.handle(httpRequest)
      expect(validatorSpy.data).toEqual({
        email: httpRequest.body.email,
        password: httpRequest.body.password,
      })
    })

    it('should return 400 if validator.validate() returns error', async () => {
      const { sut, validatorSpy } = makeSut()
      validatorSpy.resultValidate = { error: new Error() }
      const httpRequest = makeFakeRequest()
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(validatorSpy.resultValidate.error))
    })
  })
})
