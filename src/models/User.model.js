const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        todoLists: [
            {
                type: ObjectId,
                ref: 'TodoList',
            },
        ],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
