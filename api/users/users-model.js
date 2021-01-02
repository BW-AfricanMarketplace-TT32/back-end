const db = require('../../database/dbConfig')

module.exports = {
    add,
    find,
    findBy,
    findById
}

function find() {
    return db('users')
}

function findBy(filter) {
    return db('users').where(filter)
}

function findById(user_id) {
    return db('users').where({ user_id }).first()
}

async function add(user) {
    const [id] = await db('users').insert(user, 'id')
    return findById(id)
}
