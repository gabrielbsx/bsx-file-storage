import { storage } from './describe/storage'
import fastify, { type FastifyInstance } from 'fastify'
import multipart from '@fastify/multipart'

const app = (httpInstance: FastifyInstance): void => {
  httpInstance.route(storage)
}
const httpInstance = fastify({
  logger: true
})
void httpInstance.listen({
  port: 3000
})
void httpInstance.register(multipart)
app(httpInstance)
