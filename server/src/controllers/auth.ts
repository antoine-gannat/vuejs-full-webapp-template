import jwt from 'jsonwebtoken'
import Cookies from 'cookies'
import database from '../database'
import * as bcrypt from 'bcrypt'
import * as waterfall from 'async-waterfall'
import { reply, responses, HTTPResponse } from '../declarations/httpResponse'
import { logger } from '../logger'
import { getUserInfo } from './users'

function setAuthCookie (req, res, userId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const cookies = new Cookies(req, res)
    jwt.sign(userId, process.env.TEMPLATE_JWT_PASSWORD, { expiresIn: '30d' }, (err, token) => {
      if (err) {
        console.log(err)
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
          logger.log(insertResults)
          callback(null, insertResults.insertedId)
        })
        .catch((err) => callback(err))
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
  reply(res, responses.HTTP_501)
}
