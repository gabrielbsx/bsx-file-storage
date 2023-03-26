import { File } from "core/contracts";
import { createWriteStream } from "node:fs";
import { join } from "node:path";
import pump from "pump";
import { randomUUID } from "node:crypto";
import { FastifyRequest } from "fastify";

export const uploadTmpFilesWrapper = async (
  request: FastifyRequest
): Promise<File[] | undefined> => {
  const tmp = await request.files();
  if (!tmp) {
    return undefined;
  }
  const files: File[] = [];
  for await (const file of tmp) {
    const extension = file.filename.split(".").pop();
    const fileName = `${randomUUID()}.${extension}`;
    const path = join(__dirname, "..", "..", "..", "tmp", fileName);
    await pump(file.file, createWriteStream(path));
    files.push({
      filename: fileName,
      encoding: file.encoding,
      mimetype: file.mimetype,
      path,
    });
  }
  return files;
};
