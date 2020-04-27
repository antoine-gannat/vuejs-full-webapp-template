import * as jwt from 'jsonwebtoken'
import * as Cookies from 'cookies'
import { logger } from './logger'
import { HTTPResponse } from '../declarations/httpResponse'

export const AUTH_COOKIE_NAME = 'access_token'

export function setAuthCookie (req, res, userId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const cookies = new Cookies(req, res)
    jwt.sign({ user_id: userId }, process.env.template_webapp_JWT_PASSWORD, { expiresIn: '30d' }, (err, token) => {
      if (err) {
        logger.error(err)
        reject(new HTTPResponse(500, 'Failed to create the access token'))
        return
      }
      // create a new cookie with the access token
      // It will last 30 days
      cookies.set(AUTH_COOKIE_NAME, token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: true, overwrite: true })
      resolve()
    })
  })
}

export function getUserIdFromCookie (req, res): Promise<number> {
  const cookies = new Cookies(req, res)
  return new Promise((resolve, reject) => {
    jwt.verify(cookies.get(AUTH_COOKIE_NAME), process.env.template_webapp_JWT_PASSWORD, (err, decoded) => {
      if (err) {
        removeCookie(req, res, AUTH_COOKIE_NAME)
        reject(new HTTPResponse(400, 'Failed to authenticate your account, please signin'))
      }
      resolve(decoded.user_id)
    })
  })
}

export function removeCookie (req, res, cookieName:string) {
  const cookies = new Cookies(req, res)
  // this will expire the cookie
  cookies.set(cookieName)
}
