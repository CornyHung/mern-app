import jwt from 'jsonwebtoken'
import {ENV_VARS} from '../config/varEnv.js'

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: "15d"}); // Userid sign up + SECRET CODE + expires time

    res.cookie("netflix-token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 day in MS
        httpOnly: true, // Prevent xss attacks cross-site scripting attacks, make it not be accessed by JS
        sameSite: "strict", // CSRF attacks cross site request forgery attacks
        secure: ENV_VARS.NODE_ENV !== 'development' // true is https
    })

    return token
}