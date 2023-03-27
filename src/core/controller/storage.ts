import { join } from 'node:path'
import {
  badRequest,
  type Controller,
  created,
  type Request,
  type Response,
  type File
} from 'core/contracts'
import { type Either, left, uploadFiles, right } from 'core/utils'

interface Storage {
  body: {
    files: File[]
    serverName: string
    path: string
  }
}

class StorageController implements Controller {
  public async handle (request: Request<Storage['body']>): Promise<Either<any, Response>> {
    const { body } = request
    if (body === null || body === undefined) {
      return left(badRequest(new Error('No files were uploaded')))
    }
    const requiredFields = ['files', 'serverName', 'path']
    if (!requiredFields.every((field) => Object.keys(body).includes(field))) {
      return left(badRequest(new Error('Missing fields')))
    }
    console.log(body.files)
    const filesUploadedPaths = await uploadFiles(body.files, join('uploads', body.serverName, body.path))
    return right(created({ files: filesUploadedPaths }))
  }
}

export const storageController = new StorageController()
