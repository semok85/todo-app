const { google } = require('googleapis')
const nodemailer = require('nodemailer')

const { OAuth2 } = google.auth
const oauthLink = 'https://developers.google.com/oauthplayground'

const { EMAIL, CLIENT_ID, CLIENT_SECRET, MAIL_REFRESH_TOKEN } = process.env

const auth = new OAuth2(CLIENT_ID, CLIENT_SECRET, oauthLink)

exports.sendVerificationEmail = (email, title, page) => {
    const sendMail = new Promise((resolve, reject) => {
        auth.setCredentials({
            refresh_token: MAIL_REFRESH_TOKEN,
            token_type: 'Bearer',
            access_type: 'offline',
        })
        const accessToken = auth.getAccessToken()
        const smtp = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: MAIL_REFRESH_TOKEN,
                accessToken,
            },
        })
        const mailOptions = {
            from: EMAIL,
            to: email,
            subject: title,
            html: page,
        }

        smtp.sendMail(mailOptions, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
    return sendMail
}
