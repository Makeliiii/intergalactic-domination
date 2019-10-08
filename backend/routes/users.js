const router = require('express').Router()
let User = require('../models/users.models')
let UserSession = require('../models/userSession.models')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const password = req.body.password

    const newUser = new User({ username, password })

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err))
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
            return console.log(err)
        }

        const user = users[0]
        if (!user.comparePasswords(password)) {
            return console.log(err)
        }

        newUserSession.userId = user._id
        newUserSession.save()
            .then(() => res.json('User session added'))
            .catch(err => res.status(400).json('Error: ' + err))
    })
})

module.exports = router