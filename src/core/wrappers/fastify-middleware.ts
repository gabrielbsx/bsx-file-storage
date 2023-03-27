import { type Middleware } from 'core/contracts/middleware'
import { isLeft, isRight } from 'core/utils/either'
import { type FastifyReply, type FastifyRequest } from 'fastify'

export const middlewareWrapper = (middleware: Middleware) => {
  return async (request: FastifyRequest, reply: FastifyReply, next: () => void) => {
    const httpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (isLeft(httpResponse)) {
      await reply.code(httpResponse.left.statusCode).send(httpResponse.left.body)
    }
    if (isRight(httpResponse)) {
      Object.assign(request, httpResponse.right.body)
      next(); return
    }
    await reply.code(500).send({
      message: 'Internal Server Error'
    })
  }
}
