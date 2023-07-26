const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema
const todoListSchema = new mongoose.Schema(
    {
        title: String,
        status: {
            type: String,
            enum: ['Backlog', 'In Progress', 'Todo', 'Canceled', 'Done'],
        },
        label: String,
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
        },
        user: [
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

module.exports = mongoose.model('TodoList', todoListSchema)
