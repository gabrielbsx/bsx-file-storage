import { join } from 'node:path'
import { storage } from './describe/storage'
import Fastify, { type FastifyInstance } from 'fastify'
import serverStatic from '@fastify/static'
import multipart from '@fastify/multipart'
import middie from '@fastify/middie'
import formData from '@fastify/formbody'
import qs from 'qs'
import dotenv from 'dotenv'

dotenv.config()

const app = (httpInstance: FastifyInstance): void => {
  httpInstance.route(storage)
}

const httpInstance = Fastify({ logger: true })
void httpInstance.register(serverStatic, {
  root: join(__dirname, '..', '..', 'public'),
  prefix: '/public/'
})
void httpInstance.register(formData, {
  parser: (body: string) => qs.parse(body)
})
void httpInstance.register(multipart, {
  attachFieldsToBody: true,
  addToBody: true
})
void httpInstance.register(middie)
app(httpInstance)
void httpInstance.listen({
  port: 3000
})
