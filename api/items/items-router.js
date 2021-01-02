const express = require('express')
const verifyAdmin = require('../middlewares/verify-admin')
const router = express.Router()

const Items = require('./items-model')

// GET all items
router.get('/', (req, res) => {
    if (!req.query) {
        Items.find()
            .then(items => {
                res.status(200).json(items)
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    } else {
        Items.findBy(req.query)
            .then(items => {
                res.status(200).json(items)
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    }
})

// GET item by item item_id
router.get('/:id', (req, res) => {
    Items.findByItemId(req.params.id)
        .then(item => {
            res.status(200).json(item)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

// GET all items by user_id
router.get('/user/:id', (req, res) => {
    Items.findAllByUserId(req.params.id)
        .then(items => {
            res.status(200).json(items)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

// GET all categories -- WHY DO I NEED THE LIST? otherwise returns emtpy array with 200 status
router.get('/categories/list', (req, res) => {
    Items.findCategories()
        .then(categs => {
            res.status(200).json(categs)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

// GET all locations
router.get('/locations/list', (req, res) => {
    Items.findLocations()
        .then(locs => {
            res.status(200).json(locs)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

// POST new item (requires admin)
router.post('/', verifyAdmin, (req, res) => {
    const newItem = {
        ...req.body, 
        user_id: req.decodedToken.subject
    }
    Items.add(newItem)
        .then(newClass => {
            res.status(201).json(newClass)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

// POST new category
router.post('/categories', verifyAdmin, (req, res) => {
    Items.addCategory(req.body)
        .then(newCat => {
            res.status(201).json(newCat)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

// POST new location
router.post('/locations', verifyAdmin, (req, res) => {
    Items.addLocation(req.body)
        .then(newLoc => {
            res.status(201).json(newLoc)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

// PUT edited item info by id
router.put('/:id', verifyAdmin, (req, res) => {
    Items.update(req.params.id, req.body)
        .then(item => {
            res.status(200).json(item)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

// DELETE item by id
router.delete('/:id', verifyAdmin, (req, res) => {
    Items.remove(req.params.id)
        .then(response => {
            if (response === 1) {
                res.status(200).json({ message: 'successfully deleted' })
            } else {
                res.status(400).json({ message: 'error encountered while deleting' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

module.exports = router
