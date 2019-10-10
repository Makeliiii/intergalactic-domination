const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')

const users = require('./routes/api/users')

const app = express()

// Enable Cross-origin resource sharing
app.use(cors())
app.use(express.json())

// Bodyparser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// DB config
const db = require('./config/keys').mongoURI

// MongoDB connection
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to the DB'))

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')

// Routes
app.use('/api/users', users)

app.listen(5000, () => console.log('Server listening on port 5000'))