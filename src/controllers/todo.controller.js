const Todo = require('../models/TodoList.model')
const AppError = require('../libs/AppError')
const wrapAsync = require('../libs/wrapAsync')

const createTodo = wrapAsync(async (req, res) => {
    const { title, status, label, priority } = req.body
    const { userId } = req.user
    if (!title || !status || !label || !priority)
        throw new AppError('Please fill all field')
    const newTodo = await Todo.create({
        ...req.body,
        userId,
    })
    if (!newTodo) throw new AppError('Failed to create Todo', 400)
    res.status(200).json(newTodo)
})

const getTodo = wrapAsync(async (req, res) => {
    const { todoId } = req.params
    const { userId } = req.user
    const todo = await Todo.findByOne({ _id: todoId, user: userId }).lean()
    if (!todo) throw new AppError('Failed to get todo', 400)
    res.status(200).json(todo)
})

const getUserTodos = wrapAsync(async (req, res) => {
    const { userId } = req.user
    const userTodos = await Todo.find({
        user: userId,
    })
    if (!userTodos) throw new AppError('Failed to get user todos', 400)
    res.status(200).json(userTodos)
})

const updateTodo = wrapAsync(async (req, res) => {
    const { todoId } = req.params
    const { userId } = req.user
    const updatedTodo = await Todo.findOneAndUpdate(
        { _id: todoId, user: userId },
        req.body,
        {
            new: true,
        }
    )
    if (!updatedTodo) throw new AppError('Failed to update Todo', 400)
    res.status(200).json(updatedTodo)
})

const deleteTodo = wrapAsync(async (req, res) => {
    const { todoId } = req.params
    const { userId } = req.user

    const deletedTodo = await Todo.findOneAndDelete({
        _id: todoId,
        user: userId,
    })

    if (!deletedTodo) throw new AppError('Failed to delete Todo', 400)
    res.status(200).json({ message: 'Todo deleted successfully' })
})

module.exports = { createTodo, getTodo, getUserTodos, updateTodo, deleteTodo }
