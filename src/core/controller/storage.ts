import {
  badRequest,
  Controller,
  created,
  Request,
  Response,
} from "../contracts";
import { Either, left, moveFiles, right } from "../utils";

class StorageController implements Controller {
  public async handle(request: Request): Promise<Either<any, Response>> {
    const { files } = request;
    if (files) {
      const filesUploadedPaths = await moveFiles(files, "uploads/above");
      return right(created({ files: filesUploadedPaths }));
    }
    return left(badRequest(new Error("No files were uploaded")));
  }
}

export const storageController = new StorageController();
