import { storageController } from "core/controller";
import { controllerWrapper } from "../../core/wrappers";
import { RouteDescribe } from "./";

export const storage: RouteDescribe = {
  url: "/storage",
  method: "POST",
  schema: {},
  handler: controllerWrapper(storageController),
};
