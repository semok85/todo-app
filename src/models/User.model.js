const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
