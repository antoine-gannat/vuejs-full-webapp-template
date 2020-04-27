import database from '../modules/database'
import { responses } from '../declarations/httpResponse'

export interface User{
  id: number
  email: string
  username: string
  avatar: string
}

export function getUserInfo (userId: number): Promise<User> {
  return new Promise((resolve, reject) => {
    database.query('SELECT username, avatar, email FROM `users` WHERE `id` = ?', [userId])
      .then((userInfo) => {
        resolve({
          id: userId,
          email: userInfo[0].email,
          username: userInfo[0].username,
          avatar: userInfo[0].avatar
        })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function getUserInfoReq (req, res) {
  res.status(responses.HTTP_200.code).json(req.user)
}
