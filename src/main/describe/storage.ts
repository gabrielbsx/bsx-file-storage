import { middlewareWrapper } from './../../core/wrappers/fastify-middleware'
import { storageController } from 'core/controller'
import { controllerWrapper } from '../../core/wrappers'
import { type RouteDescribe } from './'
import { basicAuthenticate } from 'core/middleware'

export const storage: RouteDescribe = {
  url: '/api/storage',
  method: 'POST',
  schema: {},
  handler: controllerWrapper(storageController),
  preHandler: middlewareWrapper(basicAuthenticate)
}
