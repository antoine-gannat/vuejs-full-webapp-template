import jwt from 'jsonwebtoken';
import Cookies from 'cookies';
import database from '../database';
import * as bcrypt from 'bcrypt';
import * as waterfall from 'async-waterfall';
import { reply, responses, HTTPResponse } from '../declarations/httpResponse';
// check if the username or email is already taken
function checkUsernameAndEmail(email: string, username: string, callback: any) {
  database.query("SELECT `id` FROM `users` WHERE `email` = ? OR `username` = ?", [email, username]).then((result) => {
    if (result && result.length > 0) {
      callback({ code: 400, message: 'Username or email already taken' });
      return;
    }
    callback(null);
  }).catch((error) => {
    callback(error);
  });
}

export function signUp(req, res) {
  waterfall([
    // check if the username and email are free
    function (callback) {
      checkUsernameAndEmail(req.body.email, req.body.username, callback);
    },
    // hash the password
    function (callback) {
      bcrypt.hash(req.body.password, 8)
        .then((hashedPassword) => callback(null, hashedPassword))
        .catch(err => {
          console.error("Bcrypt error:", err);
          callback({ code: 500, message: 'Failed to hash your password, please try again' });
        });
    },
    // store the user in the database
    function (hashedPassword, callback) {
      database.query("INSERT INTO `users`(email,username,password) VALUES(?,?,?)",
        [req.body.email, req.body.username, hashedPassword])
        .then(() => callback(null))
        .catch((err) => callback(err));
    },
    // get back the inserted user infos
    function (callback) {
      database.query("SELECT `username`,`avatar` FROM `users` WHERE `email` = ? AND `username` = ?",
        [req.body.email, req.body.username])
        .then((userInfo) => {
          // if no data is found
          if (!userInfo || userInfo.length === 0) {
            callback({ code: 400, message: 'Failed to get back the user info' });
            return;
          }
          // success
          callback(null, { message: 'Account created !', user: userInfo[0] });
        })
        .catch(err => callback(err));
    }
  ],
    // waterfall result
    function (error: HTTPResponse, result) {
      // on error
      if (error) {
        return reply(res, error);
      }
      // on success
      else {
        let cookies = new Cookies(req, res);
        return res.status(result.code || 200).send(result);
      }
    })
}

export function signIn(req, res) {
  reply(res, responses.HTTP_501);
}