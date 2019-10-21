const mongoose = require('mongoose')
const Schema = mongoose.Schema

// User Schema
const ChargerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    inUse: {
        type: Boolean,
        default: false,
        required: true
    },
    latitude: {
        type: Schema.Types.Decimal128,
        required: true
    },
    longitude: {
        type: Schema.Types.Decimal128,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})

module.exports = Charger = mongoose.model('chargers', ChargerSchema)