const mongoose = require('mongoose')

require('dotenv').config()

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        if (connect) console.log('Database connected successfully...')
    } catch (err) {
        console.log('Error connecting to mongoDB')
    }
}

const disconnectDB = async () => {
    try {
        const disconect = await mongoose.connection.close()
        if (disconect) console.log('Databae disconnected...')
    } catch (error) {
        console.log('Failed to disconnect DB')
    }
}

module.exports = { connectDB, disconnectDB }
