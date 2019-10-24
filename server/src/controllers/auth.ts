import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

export function login(req, res) {
    let cookies = new Cookies(req, res);
    res.status(200).send({ message: 'Logged in !' });
}