import { storageController } from 'core/controller'
import { controllerWrapper } from '../../core/wrappers'
import { type RouteDescribe } from './'

export const storage: RouteDescribe = {
  url: '/api/storage',
  method: 'POST',
  schema: {},
  handler: controllerWrapper(storageController)
}
