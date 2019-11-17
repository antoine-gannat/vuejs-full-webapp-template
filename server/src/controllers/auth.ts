import jwt from 'jsonwebtoken';
import Cookies from 'cookies';
import database from '../database';

export function signIn(req, res) {
    let db = database.getDb();
    // let cookies = new Cookies(req, res);
    res.status(200).send({ message: 'Signed in !' });
}