import {
  badRequest,
  type Controller,
  created,
  type Request,
  type Response
} from 'core/contracts'
import { type Either, left, moveFiles, right } from 'core/utils'

class StorageController implements Controller {
  public async handle (request: Request): Promise<Either<any, Response>> {
    const { files } = request
    if (files != null) {
      const filesUploadedPaths = await moveFiles(files, 'uploads/above')
      return right(created({ files: filesUploadedPaths }))
    }
    return left(badRequest(new Error('No files were uploaded')))
  }
}

export const storageController = new StorageController()
