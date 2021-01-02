const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const itemsRouter = require('./items/items-router')

const verifyToken = require('./middlewares/verify-token')
const verifyAdmin = require('./middlewares/verify-admin')

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/auth', authRouter)
server.use('/users', verifyToken, verifyAdmin, usersRouter)
server.use('/items', verifyToken, itemsRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' })
})

module.exports = server
