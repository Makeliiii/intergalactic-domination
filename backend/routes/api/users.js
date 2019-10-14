const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

// Load user model
const User = require('../../models/User')

// @route POST api/users/register
// @desc Register Route
router.post('/register', (req, res) => {
    User.findOne({ username: req.body.username }).then(user => {
        if (user) {
            return res.status(400).json({ username: 'Username already exists'})
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            })

            // Hash password before saving to the db
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

// @route POST api/users/login
// @desc Login user and return JWT token
router.post('/login', (req, res) => {
    const { username, password } = req.body

    // Find user by username
    User.findOne({ username }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(400).json({ userNotFound: 'User not found' })
        }

        // Check if password matches
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                }

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { 
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: token
                        })
                    }
                )
            } else {
                return res.status(400).json({ passwordIncorrect: 'Password incorrect' })
            }
        })
    })
})

module.exports = router