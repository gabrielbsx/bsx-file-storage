import { type Either } from 'core/utils/either'
import { type Response, type Request } from './http'

export interface Middleware {
  handle: <T = any>(request: Request) => Promise<Either<Response<Error>, Response<T>>>
}
