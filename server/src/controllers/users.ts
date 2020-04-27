import database from '../database'

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
