// custom error class, used to store an http response
export class HTTPResponse extends Error {
  code: number
  constructor (httpCode: number, message: string) {
    super(message)
    this.code = httpCode
  }
}

// Some basic predefined HTTP responses
export const responses = {
  HTTP_500: new HTTPResponse(500, 'An internal error occured.'),
  HTTP_501: new HTTPResponse(501, 'Not implemented.'),
  HTTP_200: new HTTPResponse(200, 'Success.')
}

// reply to a request with an HTTP response
export function reply (res, response: HTTPResponse) {
  res.status(response.code).json(response)
}
