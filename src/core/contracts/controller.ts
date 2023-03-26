import { type Either } from '../utils/either'
import { type Request, type Response } from './'

export interface Controller {
  handle: (request: Request) => Promise<Either<Error, Response>>
}
