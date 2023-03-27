import { ok, unauthorized, type Middleware, type Request, type Response } from 'core/contracts'
import { left, right, type Either } from 'core/utils'
import { env } from 'node:process'

class BasicAuthenticate implements Middleware {
  async handle (request: Request): Promise<Either<Response<Error>, Response>> {
    const [type, basicEncoded] = request.headers?.authorization?.split(' ') ?? []
    if (type === 'Basic') {
      const [username, password] = Buffer.from(basicEncoded, 'base64').toString().split(':')
      if (username === env.USERNAME && password === env.PASSWORD) {
        return right(ok({ message: 'Authenticated' }))
      }
    }
    return left(unauthorized(new Error('Invalid credentials')))
  }
}

export const basicAuthenticate = new BasicAuthenticate()
