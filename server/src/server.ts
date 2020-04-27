import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import { OpenApiValidator } from 'express-openapi-validator'
import * as http from 'http'
import { logger, middleware as logMiddleware } from './modules/logger'
import service from './service'
import database from './modules/database'
import * as dotenv from 'dotenv'

// import the env variables from the .env file
dotenv.config()

async function start () {
  // connect to the database
  await database.connect().catch((err) => {
    // on error leave
    logger.error(err)
    logger.info('Exiting..')
    process.exit(1)
  })

  // Set the port
  const port = Number(process.env.PORT) || 4000

  // instantiate express
  const app = express()

  // Register a static route to serve the client
  const staticFolder = path.join(__dirname, '../client-dist')
  logger.log('Serving front-end from folder: ', staticFolder)

  // Set the log middleware
  app.use(logMiddleware)

  // Body parser to parse json body
  app.use(bodyParser.json())

  app.use(bodyParser.urlencoded({ extended: true }))

  // host the client
  app.use('/', express.static(staticFolder))

  new OpenApiValidator({
    apiSpec: path.join(__dirname, 'openapi.yaml')
  })
    .install(app)
    .then(() => {
      // authentication
      app.post('/api/auth/signin/', service.auth.signIn)
      app.post('/api/auth/signup/', service.auth.signUp)
      app.delete('/api/auth/', service.auth.signOut)
      // set the auth middleware
      app.use(service.auth.middleware)
      app.get('/api/users/myself/', service.users.getUserInfoReq)

      // Express error handler
      app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
          message: err.message,
          errors: err.errors
        })
      })

      http.createServer(app).listen(port, '0.0.0.0', () => {
        logger.log(`Dev server listening on port ${port}`)
      })
    })
}

// start the server
start()
