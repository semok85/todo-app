const User = require('../models/User.model')
const AppError = require('../libs/AppError')
const wrapAsync = require('../libs/wrapAsync')
const { sendVerificationEmail } = require('../libs/sendMail')
const generateTokens = require('../libs/generateTokens')
const { cookieOptions } = require('../config/authHelper')

const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const page = '<html><body><h1>Your Pin is <b>1234</b></h1></body></html>'

const login = wrapAsync(async (req, res) => {
    const { name, email, pin } = req.body
    if (!name || !email || !pin)
        throw new AppError('Field cannot be empty', 400)
    if (!emailValidation(email))
        throw new AppError('Please fill correct email format', 400)
    const emailSend = await sendVerificationEmail(email, 'Pin for login', page)
    if (!emailSend) throw new AppError('Failed to send pin', 400)
    if (pin === '1234') {
        let user
        const foundUser = await User.findOne({ email }).lean()
        if (!foundUser) {
            user = await User.create({ name, email })
        } else {
            user = foundUser
        }
        const { accessToken } = generateTokens(user.id)
        res.cookie('accessToken', accessToken)
        res.status(200).json(accessToken)
    }
})

const logOut = wrapAsync(async (req, res) => {
    res.clearCookie('accessToken', cookieOptions)
    return res.status(200).json({ message: 'Cookie cleared' })
})

const editName = wrapAsync(async (req, res) => {
    const { name } = req.body
    const { userId } = req.user
    const user = await User.findById(userId).exec()
    if (!name) throw new AppError('Please provide a new name', 400)
    if (name === user.name)
        throw new AppError('Please provide a different name.')
    user.name = name
    await user.save()
    res.status(200).json({ message: 'Name updated successfully.' })
})

module.exports = { login, logOut, editName }
