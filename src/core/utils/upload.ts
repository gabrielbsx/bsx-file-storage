import { randomUUID } from 'node:crypto'
import { type File } from 'core/contracts'
import { existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

export const uploadFiles = async (
  files: File[],
  destination: string,
  fileName?: string
): Promise<string[]> => {
  const paths: string[] = []
  for (const file of files) {
    const publicFolder = join(__dirname, '..', '..', '..', 'public')
    const extension = file.mimetype.split('/')?.[1]
    const fileNameGeneratedOrProvided = fileName ?? `${randomUUID()}.${extension}`
    const path = join(publicFolder, destination, fileNameGeneratedOrProvided)
    const isFolderExists = existsSync(join(publicFolder, destination))
    if (!isFolderExists) {
      mkdirSync(join(publicFolder, destination), { recursive: true })
    }
    const buffer = file.data
    writeFileSync(path, buffer)
    paths.push(`${destination}/${fileNameGeneratedOrProvided}`)
  }
  return paths
}
