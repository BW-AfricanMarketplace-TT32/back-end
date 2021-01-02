module.exports = {
    verifyCredentials
}

function verifyCredentials(user) {
    return Boolean(user.email && user.password && typeof user.password === 'string')
}
