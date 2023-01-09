import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../config';

const generateJWT = (userID = '', userRole) => {

    return new Promise((resolve, reject) => {
        const payload = { userID, userRole };

        jwt.sign(
            payload,
            JWT_PRIVATE_KEY,
            {
                expiresIn: '12h'
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token')
                } else {
                    resolve(token);
                }
            })
    })
}

const validateJWT = async (req, res, next) => {

    let token = req.headers['authorization'];

    if (!token) { // If token is empty
        // TODO return res.status(UNAUTHORIZED).json({
        return res.status(401).json({
            status: 401,
            msg: 'No token recieved'
        });
    } else {
        token = token.replace('Bearer ', '');

        try {
            const payload = jwt.verify(token, JWT_PRIVATE_KEY);
            req.payloadToken = payload;
            next();
        } catch (error) {
            // TODO return res.status(UNAUTHORIZED).json({
            return res.status(401).json({
                status: 401,
                msg: 'JWT Error',
                error
            });
        }
    }
}

module.exports = {
    generateJWT,
    validateJWT
}
