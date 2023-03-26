import { FastifyRequest, FastifyReply } from "fastify";
import { Controller } from "../contracts";
import { isLeft, isRight } from "../utils";
import { uploadTmpFilesWrapper } from "./fastify-upload-tmp-files";

export const controllerWrapper = (controller: Controller) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const files = await uploadTmpFilesWrapper(request);
    const httpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
      files,
    };
    const httpResponse = await controller.handle(httpRequest);
    if (isLeft(httpResponse)) {
      return reply.code(500).send({
        message: httpResponse.left.message,
      });
    }
    if (isRight(httpResponse)) {
      return reply.code(200).send(httpResponse.right.body);
    }
    return reply.code(500).send({
      message: "Internal Server Error",
    });
  };
};
