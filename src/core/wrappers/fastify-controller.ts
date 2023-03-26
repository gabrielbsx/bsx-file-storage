import { type FastifyRequest, type FastifyReply } from 'fastify'
import { type Controller } from 'core/contracts'
import { isLeft, isRight } from 'core/utils'
import { uploadTmpFilesWrapper } from './fastify-upload-tmp-files'

export const controllerWrapper = (controller: Controller) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const files = await uploadTmpFilesWrapper(request)
    const httpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
      files
    }
    const httpResponse = await controller.handle(httpRequest)
    if (isLeft(httpResponse)) {
      await reply.code(500).send({
        message: httpResponse.left.body.message
      })
    }
    if (isRight(httpResponse)) {
      await reply.code(200).send(httpResponse.right.body)
    }
    await reply.code(500).send({
      message: 'Internal Server Error'
    })
  }
}
