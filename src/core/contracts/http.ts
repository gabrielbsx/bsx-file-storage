export interface File {
  filename: string;
  encoding: string;
  mimetype: string;
  path: string;
}

export interface Request {
  body?: any;
  params?: any;
  query?: any;
  files?: File[];
}

export interface Response {
  statusCode: number;
  body: any;
}

export const ok = (body: any): Response => ({
  statusCode: 200,
  body,
});

export const created = (body: any): Response => ({
  statusCode: 201,
  body,
});

export const badRequest = (error: Error): Response => ({
  statusCode: 400,
  body: {
    error: error.message,
  },
});

export const unauthorized = (error: Error): Response => ({
  statusCode: 401,
  body: {
    error: error.message,
  },
});

export const forbidden = (error: Error): Response => ({
  statusCode: 403,
  body: {
    error: error.message,
  },
});

export const notFound = (error: Error): Response => ({
  statusCode: 404,
  body: {
    error: error.message,
  },
});
