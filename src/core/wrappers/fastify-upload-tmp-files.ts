import { type File } from 'core/contracts'
import { createWriteStream } from 'node:fs'
import { join } from 'node:path'
import pump from 'pump'
import { randomUUID } from 'node:crypto'
import { type FastifyRequest } from 'fastify'

export const uploadTmpFilesWrapper = async (
  request: FastifyRequest
): Promise<File[]> => {
  const tmp = request.files()
  const files: File[] = []
  for await (const file of tmp) {
    const extension = file.mimetype.split('/')[1]
    const fileName = `${randomUUID()}.${extension}`
    const path = join(__dirname, '..', '..', '..', 'tmp', fileName)
    pump(file.file, createWriteStream(path))
    files.push({
      filename: fileName,
      encoding: file.encoding,
      mimetype: file.mimetype,
      path
    })
  }
  return files
}
