// import important stuff
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10

// user schema
const userSessionSchema = new Schema({
    userId: {
        type: Number,
        default: -1,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('userSession', userSessionSchema)

module.exports = User