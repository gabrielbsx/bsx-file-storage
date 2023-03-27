import { randomUUID } from 'node:crypto'
import { type File } from 'core/contracts'
import { mkdir } from 'node:fs/promises'
import { existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

export const uploadFiles = async (files: File[], destination: string): Promise<string[]> => {
  const promises = files.map(async (file) => {
    const publicFolder = join(__dirname, '..', '..', '..', 'public')
    const extension = file.mimetype.split('/')[1]
    const fileName = `${randomUUID()}.${extension}`
    const path = join(publicFolder, destination, fileName)
    const isFolderExist = existsSync(join(publicFolder, destination))
    if (!isFolderExist) {
      await mkdir(join(publicFolder, destination), { recursive: true })
    }
    const buffer = file.data
    writeFileSync(path, buffer)
    return `${destination}/${fileName}`
  })
  return await Promise.all(promises)
}
