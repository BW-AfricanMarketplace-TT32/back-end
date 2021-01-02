const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/secrets')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        res.status(401).json({ message: 'no token supplied' })
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: `no acceptable token supplied: ${err.message}` })
            } else {
                req.decodedToken = decoded
                next()
            }
        })
    }
}
