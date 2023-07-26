const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const errorHandler = require('./src/middlewares/errorHandler.middleware')
const { connectDB } = require('./src/config/connectDB')
const userRouter = require('./src/routes/v1/user.router')
const todoRouter = require('./src/routes/v1/todo.routes')

const app = express()
dotenv.config()
const PORT = 8000 || process.env.PORT

// midleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// serve static file
app.use('/', express.static(path.join(__dirname, './public')))

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, './src', 'views', 'index.html'))
})
app.use('/api/v1/users', userRouter)
app.use('/api/v1/todos', todoRouter)

// not found page handler
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, './src/views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// error handler middleware
app.use(errorHandler)

// connect to database
connectDB()

app.listen(PORT, () => {
    console.log(`Server runing at PORT ${PORT}...`)
})
