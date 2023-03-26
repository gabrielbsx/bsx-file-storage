export interface SchemaValidator {
  type: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object'
  properties?: Record<string, SchemaValidator> | SchemaValidator
  items?: SchemaValidator
}

export interface RouteDescribe {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
  schema: {
    body?: SchemaValidator
    querystring?: SchemaValidator
    params?: SchemaValidator
  }
  handler: (request: any, reply: any) => Promise<any>
}

export * from './storage'
