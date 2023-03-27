import { ok, unauthorized, type Middleware, type Request, type Response } from 'core/contracts'
import { left, right, type Either } from 'core/utils'
import { env } from 'node:process'

class BasicAuthenticate implements Middleware {
  async handle (request: Request): Promise<Either<Response<Error>, Response>> {
    const [type, credentials] = request.headers?.authorization?.split(' ') ?? []
    if (type === 'Basic') {
      if (credentials === env.BASIC) {
        return right(ok({ message: 'Authenticated' }))
      }
    }
    return left(unauthorized(new Error('Invalid credentials')))
  }
}

export const basicAuthenticate = new BasicAuthenticate()
