const jwt = require('jsonwebtoken')
const AppError = require('../libs/AppError')
require('dotenv').config()

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.authorization
    if (!authHeader?.startsWith('Bearer '))
        throw new AppError('Unauthorized', 401)
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) throw new AppError('error', 403)
        req.user = { userId: decoded.userId }
        next()
    })
}

module.exports = { auth }
