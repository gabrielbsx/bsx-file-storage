import { type Either } from '../utils/either'
import { type Request, type Response } from './'

export interface Controller {
  handle: <T = any>(request: Request) => Promise<Either<Response<Error>, Response<T>>>
}
