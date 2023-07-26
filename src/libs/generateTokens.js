const jwt = require('jsonwebtoken')
const { tokenPayload, tokenExpiresIn } = require('../config/authHelper')
require('dotenv').config()
/**
 * generate new access and refresh token
 * @param {string} id
 * @param {string} role
 * @returns {Object}
 */
const generateTokens = (id) => {
    const accessToken = jwt.sign(
        tokenPayload(id),
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: tokenExpiresIn.accessToken }
    )

    const newRefreshToken = jwt.sign(
        tokenPayload(id),
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: tokenExpiresIn.refreshToken }
    )
    return { accessToken, newRefreshToken }
}
module.exports = generateTokens
