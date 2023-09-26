import { HttpResponse } from '@presentation/protocols/types'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error,
})

export const created = (): Omit<HttpResponse, 'body'> => ({
  statusCode: 201,
})

export const noContent = (): Omit<HttpResponse, 'body'> => ({
  statusCode: 204,
})

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error,
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new Error('Internal server error'),
})

export const success = <T>(data: T): HttpResponse => ({
  statusCode: 200,
  body: data,
})

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: error.message,
})
