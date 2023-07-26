const todoRouter = require('express').Router()

const todoController = require('../../controllers/todo.controller')
const { auth } = require('../../middlewares/verifyJwt.middleware')

todoRouter.post('/', auth, todoController.createTodo)
todoRouter.get('/', auth, todoController.getUserTodos)
todoRouter.get('/:todoId', auth, todoController.getTodo)
todoRouter.patch('/update/:todoId', auth, todoController.updateTodo)
todoRouter.delete('/delete/:todoId', auth, todoRouter.delete)

module.exports = todoRouter
