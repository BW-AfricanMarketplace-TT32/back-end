const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { jwtSecret } = require('../../config/secrets')
const Users = require('../users/users-model')
const { verifyCredentials } = require('../users/users-service')

const router = express.Router()

// POST register new user (return success mesage)
router.post('/register', (req, res) => {
    const credentials = req.body
    if (verifyCredentials(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8
        const hash = bcryptjs.hashSync(credentials.password, rounds)

        credentials.password = hash

        Users.add(credentials)
            .then(newUser => {
                res.status(201).json({ message: 'Success registering!', user: newUser })
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    } else {
        res.status(400).json({ message: 'Invalid credentials, please enter email and alphanumeric password' })
    }
})

// POST login registered user (return user obj plus token)
router.post('/login', (req, res) => {
    const { email, password } = req.body

    if (verifyCredentials(req.body)) {
        Users.findBy({ email: email })
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeToken(user)
                    res.status(200).json({
                        message: `Welcome, ${email}`,
                        token: token
                    })
                } else {
                    res.status(401).json({ message: 'Invalid credentials' })
                }
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    }
})

// GET logout
// router.get('/logout', (req, res) => {
// })

function makeToken(user) {
    const payload = {
        subject: user.user_id,
        email: user.email,
        admin_status: user.admin_status
    }
    const options = {
        expiresIn: '1 day'
    }
    return jwt.sign(payload, jwtSecret, options)
}

module.exports = router
