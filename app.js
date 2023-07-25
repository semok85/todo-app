const express = require('express')
const dotenv = require('dotenv')

const app = express()
dotenv.config()
const PORT = 8000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`Server runing at PORT ${PORT}...`)
})
