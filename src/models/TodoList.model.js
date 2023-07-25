const mongoose = require('mongoose')

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
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('TodoList', todoListSchema)
