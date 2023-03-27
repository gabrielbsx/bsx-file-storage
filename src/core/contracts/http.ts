export interface File {
  filename: string
  encoding: string
  mimetype: string
  path: string
}

export interface Request<T = any> {
  body?: any
  params?: any
  query?: any
  headers?: any
  auth?: T
  files?: File[]
}

export interface Response<T = any> {
  statusCode: number
  body: T
}

export const ok = <T>(body: T): Response<T> => ({
  statusCode: 200,
  body
})

export const created = <T>(body: T): Response<T> => ({
  statusCode: 201,
  body
})

export const badRequest = (error: Error): Response => ({
  statusCode: 400,
  body: {
    error: error.message
  }
})

export const unauthorized = (error: Error): Response => ({
  statusCode: 401,
  body: {
    error: error.message
  }
})

export const forbidden = (error: Error): Response => ({
  statusCode: 403,
  body: {
    error: error.message
  }
})

export const notFound = (error: Error): Response => ({
  statusCode: 404,
  body: {
    error: error.message
  }
})
