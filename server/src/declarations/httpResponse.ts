export interface HTTPResponse {
  code: number,
  message: string
}

// Some basic predefined HTTP responses
export const responses = {
  HTTP_500: { code: 500, message: 'An internal error occured.' },
  HTTP_501: { code: 501, message: 'Not implemented.' },
  HTTP_200: { code: 200, message: 'Success' }
}

export function reply(res, response: HTTPResponse) {
  res.status(response.code).json(response);
}