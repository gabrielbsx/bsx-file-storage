import { type File } from 'core/contracts'
import { rename, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

export const moveFiles = async (files: File[], destination: string): Promise<string[]> => {
  const promises = files.map(async (file) => {
    const publicFolder = join(__dirname, '..', '..', '..', 'public')
    const path = join(publicFolder, destination, file.filename)
    const isFolderExist = existsSync(join(publicFolder, destination))
    if (!isFolderExist) {
      await mkdir(join(publicFolder, destination), { recursive: true })
    }
    await rename(file.path, path)
    return `${destination}/${file.filename}`
  })
  return await Promise.all(promises)
}
