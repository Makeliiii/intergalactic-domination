const express = require('express')
const router = express.Router()

// Load charger model
const Charger = require('../../models/Charger')

// @route POST api/chargers/add
// @desc Add chargers Route
router.post('/add', (req, res) => {
    Charger.findOne({ name: req.body.name }).then(charger => {
        if (charger) {
            return res.status(400).json({ name: 'Charger already exists' })
        } else {
            const newCharger = new Charger({
                name: req.body.name,
                type: req.body.type,
                inUse: req.body.inUse,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                location: req.body.location
            })

            newCharger.save()
                .then(charger => res.json(charger))
                .catch(err => console.log(err))
        }
    })
})

// @route GET api/chargers/get
// @desc Get the chargers
router.get('/get', (req, res) => {
    Charger.find((err, chargers) => {
        if (err) {
            console.log(err)
        } else {
            res.json(chargers)
        }
    })
})

module.exports = router