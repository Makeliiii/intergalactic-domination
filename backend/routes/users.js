const router = require('express').Router()

// Models
let User = require('../models/users.models')
let UserSession = require('../models/userSession.models')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const { username, password } = req.body

    User.findOne({ username: username })
        .then(user => {
            if (user) {
                console.log('User already exists')
            } else {
                const newUser = new User({ username, password })

                newUser.save()
                    .then(() => res.json('User added'))
                    .catch(err => res.status(400).json('Error: ' + err))
            }
        })
})

router.route('/login').post((req, res) => {
    const username = req.body.username
    const password = req.body.password

    const newUserSession = new UserSession({ username, password })

    User.find({
        username: username
    }, (err, users) => {
        if (err) {
            return console.log(err)
        }
        if (users.length != 1) {
            return res.send({
                success: false
            })
        }

        const user = users[0]
        if (!user.comparePassword(password)) {
            return res.send({
                success: false
            })
        }

        newUserSession.userId = user._id
        newUserSession.save((err, doc) => {
            if (err) {
                console.log(err)
                return res.send({
                    success: false
                })
            }

            return res.send({
                success: true,
                token: doc._id
            })
        })
    })
})

router.route('/verify').get((req, res) => {
    const { query } = req,
          { token } = query
    
    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            return console.log(err)
        }

        if (sessions.length != 1) {
            return res.send({
                success: false
            })
        } else {
            return res.send({
                success: true
            })
        }
    })
})

router.route('/logout').get((req, res) => {
    const { query } = req,
          { token } = query

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set: {
            isDeleted: true
        }
    }, null, (err, sessions) => {
        if (err) {
            console.log(err)
        }

        return res.send({
            success: true
        })
    })
})

module.exports = router