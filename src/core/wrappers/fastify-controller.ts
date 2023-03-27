import { type FastifyRequest, type FastifyReply } from 'fastify'
import { type Controller } from 'core/contracts'
import { isLeft, isRight } from 'core/utils'

export const controllerWrapper = (controller: Controller) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const httpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers
    }
    const httpResponse = await controller.handle(httpRequest)
    if (isLeft(httpResponse)) {
      await reply.code(httpResponse.left.statusCode).send(httpResponse.left.body)
    }
    if (isRight(httpResponse)) {
      await reply.code(200).send(httpResponse.right.body)
    }
    await reply.code(500).send({
      message: 'Internal Server Error'
    })
  }
}
