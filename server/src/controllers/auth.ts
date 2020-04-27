import database from '../modules/database'
import * as bcrypt from 'bcrypt'
import * as waterfall from 'async-waterfall'
import { reply, responses, HTTPResponse } from '../declarations/httpResponse'
import { logger } from '../modules/logger'
import { getUserInfo } from './users'
import { setAuthCookie, getUserIdFromCookie, removeCookie, AUTH_COOKIE_NAME } from '../modules/cookies'

export function signUp (req, res) {
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
          callback(null, userId)
        })
        .catch((err) => {
          callback(err)
        })
    }
  ],
  // waterfall result
  function (error: HTTPResponse, userId: number) {
    // on error
    if (error) {
      return reply(res, error)
    }
    // on success, get the user's info and send them
    getUserInfo(userId)
      .then((userInfo) => {
        res.status(responses.HTTP_200.code).json(userInfo)
      })
      .catch((err) => {
        reply(res, err)
      })
  })
}

export function signIn (req, res) {
  // get the user's hashed password from the database
  database.query('SELECT id, password from `users` WHERE `email` = ?', [req.body.email])
    .then((results) => {
      // compare the passwords
      bcrypt.compare(req.body.password, results[0].password,
        (err, result) => {
          // on error
          if (err || !result) {
            return reply(res, new HTTPResponse(400, 'Invalid email or password.'))
          }
          // on success
          // generate and set the authetication token
          setAuthCookie(req, res, results[0].id)
            .then(() => {
              // on success, get the user's info and send them
              getUserInfo(results[0].id)
                .then((userInfo) => {
                  res.status(responses.HTTP_200.code).json(userInfo)
                })
                .catch((err) => {
                  reply(res, err)
                })
            })
            .catch((err) => {
              logger.error(err.message)
              reply(res, responses.HTTP_500)
            })
        })
    })
    .catch(() => {
      reply(res, new HTTPResponse(400, 'Invalid email or password.'))
    })
}

export function signOut (req, res) {
  removeCookie(req, res, AUTH_COOKIE_NAME)
  reply(res, responses.HTTP_200)
}

export function middleware (req, res, next) {
  // start by getting the user's id
  getUserIdFromCookie(req, res)
    .then((userId) => {
      // get the latest user's informations from the database
      getUserInfo(userId)
        .then((userInfo) => {
          req.user = userInfo
          // everything went well, go on
          next()
        }).catch((err) => {
          reply(res, err)
        })
    })
    .catch((err) => {
      reply(res, err)
    })
}
