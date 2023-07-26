const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000,
}
/**
 * Function to set token payload
 * @param {string} id
 * @returns {{userId:string, userRole:string}}
 */
function tokenPayload(id) {
    return { userId: id }
}

const tokenExpiresIn = {
    accessToken: '1d',
    refreshToken: '3d',
}

module.exports = { cookieOptions, tokenPayload, tokenExpiresIn }
