import * as jwt from 'jsonwebtoken'
import * as Cookies from 'cookies'
import database from '../database'
import * as bcrypt from 'bcrypt'
import * as waterfall from 'async-waterfall'
import { reply, responses, HTTPResponse } from '../declarations/httpResponse'
import { logger } from '../logger'

function setAuthCookie(req, res, userId: number) {
  return new Promise((resolve, reject) => {
    const cookies = new Cookies(req, res)
    jwt.sign({ user_id: userId }, process.env.template_webapp_JWT_PASSWORD, { expiresIn: "30d" }, (err, token) => {
      if (err) {
        logger.error(err)
        reject(new HTTPResponse(500, 'Failed to create the access token'))
        return
      }
      // create a new cookie with the access token
      // It will last 30 days
      cookies.set('access-token', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: true, overwrite: true })
      resolve()
    })
  })
}

export function signUp(req, res) {
  waterfall([
    // check if the username and email are free
    function (callback) {
      database.query('SELECT `id` FROM `users` WHERE `email` = ? OR `username` = ?',
        [req.body.email, req.body.username])
        .then((result) => {
          if (result && result.length > 0) {
            callback(new HTTPResponse(400, 'Username or email already taken'))
            return
          }
          callback(null)
        }).catch((error) => {
          callback(error)
        })
    },
    // hash the password
    function (callback) {
      bcrypt.hash(req.body.password, 8)
        .then((hashedPassword) => callback(null, hashedPassword))
        .catch(err => {
          logger.error('Bcrypt error:', err)
          callback(new HTTPResponse(500, 'Failed to hash your password, please try again'))
        })
    },
    // store the user in the database
    function (hashedPassword: string, callback) {
      database.query('INSERT INTO `users`(email, username, password) VALUES(?,?,?)',
        [req.body.email, req.body.username, hashedPassword])
        .then((insertResults) => {
          callback(null, insertResults.insertId)
        })
        .catch((err) => {
          callback(err)
        })
    },
    // generate and set the authentication token
    function (userId: number, callback) {
      setAuthCookie(req, res, userId)
        .then(() => {
          callback(null, new HTTPResponse(200, "Account created !"))
        })
        .catch((err) => {
          callback(err)
        })
    }
  ],
    // waterfall result
    function (error: HTTPResponse, result: HTTPResponse) {
      // on error
      if (error) {
        return reply(res, error)
      }
      // on success
      return reply(res, result)
    })
}

export function signIn(req, res) {
  // get the user's hashed password from the database
  database.query("SELECT id, password from `users` WHERE `email` = ?", [req.body.email])
    .then((results) => {
      // compare the passwords
      bcrypt.compare(req.body.password, results[0].password,
        (err, result) => {
          // on error
          if (err || !result) {
            return reply(res, new HTTPResponse(400, "Invalid email or password."));
          }
          // on success
          // generate and set the authetication token
          setAuthCookie(req, res, results[0].id)
            .then(() => {
              reply(res, new HTTPResponse(200, "Signed in !"))
            })
            .catch((err) => {
              logger.error(err.message);
              reply(res, responses.HTTP_500);
            })
        })
    })
    .catch((err) => {
      reply(res, new HTTPResponse(400, "Invalid email or password."));
    })
}
