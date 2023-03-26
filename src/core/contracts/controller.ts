import { Either } from "../utils/either";
import { Request, Response } from "./";

export interface Controller {
  handle(request: Request): Promise<Either<Error, Response>>;
}
