import { storage } from './describe/storage'
import Fastify, { type FastifyInstance } from 'fastify'
import multipart from '@fastify/multipart'

const app = (httpInstance: FastifyInstance): void => {
  httpInstance.route(storage)
}
const httpInstance = Fastify({ logger: true })
void httpInstance.register(multipart)
app(httpInstance)
void httpInstance.listen({
  port: 3000
})
