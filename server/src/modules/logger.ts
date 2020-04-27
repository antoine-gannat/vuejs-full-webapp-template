import * as onFinished from 'on-finished'
import * as chalk from 'chalk'

function getIp (req): String {
  let ip: String
  // Get the ip from the headers
  if (req.headers['cf-connecting-ip'] && req.headers['cf-connecting-ip'].split(', ').length) {
    const first = req.headers['cf-connecting-ip'].split(', ')
    ip = first[0]
  } else {
    ip = req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
  }
  return (ip)
}

// Log request informations
// Format: {ClientIP} {Request Method} {Request URL} {Response code} {Treatment duration}
export function middleware (req: any, res, next) {
  // get the start time of the request
  const startTime = process.hrtime()
  // get the request url
  const url = req.url
  // wait for the response to be sent
  onFinished(res, (err) => {
    // on error, do nothing
    if (err) {
      return
    }
    const endTime = process.hrtime()
    const ip = getIp(req)

    // calculate exec time
    const duration = (endTime[0] - startTime[0]) * 1e3 +
      (endTime[1] - startTime[1]) * 1e-6
    console.log(ip,
      chalk.yellow(req.method),
      url,
      res.statusCode >= 400 ? chalk.red(String(res.statusCode)) : chalk.green(String(res.statusCode)),
      duration.toFixed(3) + ' ms')
  })
  next()
}

export const logger = {
  log: function (...args) {
    console.log(chalk.blueBright(new Date()), args.join(' '))
  },
  info: function (...args) {
    console.log(chalk.blueBright(new Date()), chalk.blue(args.join(' ')))
  },
  error: function (...args) {
    console.error(chalk.blueBright(new Date()), chalk.red(args.join(' ')))
  },
  success: function (...args) {
    console.log(chalk.blueBright(new Date()), chalk.green(args.join(' ')))
  }
}
