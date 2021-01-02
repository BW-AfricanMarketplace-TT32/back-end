const express = require('express')
const Users = require('./users-model')
const Items = require('../items/items-model')

const router = express.Router()

// GET all users
router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

// GET user by id (add user's items for sale to array)
router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            Items.findAllByUserId(req.params.id)
                .then(items => {
                    res.status(200).json({ ...user, items: items })
                })
                .catch(err => {
                    res.status(400).json({ message: err.message })
                })
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

module.exports = router
