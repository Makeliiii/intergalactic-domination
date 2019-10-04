// import important things
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

// make an object of express
const app = express()
const port = process.env.PORT || 5000

// cross-origin resource sharing and body parser
app.use(cors())
app.use(express.json())

// uri and some flags to deal with some updates to mongodb
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log('Connected to the database')
})

// gotta get that users route...
const usersRouter = require('./routes/users')

// ...and use it
app.use('/users', usersRouter)

// launch the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})