const userRouter = require('express').Router()

const { auth } = require('../../middlewares/verifyJwt.middleware')

const userController = require('../../controllers/user.controller')

userRouter.post('/', userController.login)
userRouter.post('/logout', auth, userController.logOut)
userRouter.put('/', auth, userController.editName)

module.exports = userRouter
