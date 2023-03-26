export interface RouteDescribe {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
  schema: {
    body?: any;
    querystring?: any;
    params?: any;
  };
  handler: (request: any, reply: any) => void;
}

export * from "./storage";
