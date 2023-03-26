import { storage } from "./describe/storage";
import fastify, { FastifyInstance } from "fastify";
import multipart from "@fastify/multipart";

const app = async (httpInstance: FastifyInstance) => {
  httpInstance.route(storage);
};
const httpInstance = fastify({
  logger: true,
});
httpInstance.listen({
  port: 3000,
});
httpInstance.register(multipart);
app(httpInstance);
