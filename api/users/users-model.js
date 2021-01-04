const db = require('../../database/dbConfig')

module.exports = {
    add,
    find,
    authFindBy,
    findBy,
    findById
}

function find() {
    return db('users')
        .select(
            'user_id', 
            'email',
            'admin_status'
        )
}

function authFindBy(filter) {
    return db('users').where(filter)
}

function findBy(filter) {
    return db('users').where(filter)
        .select(
            'user_id', 
            'email',
            'admin_status'
        )
}

function findById(user_id) {
    return db('users').where({ user_id }).first()
        .select(
            'user_id', 
            'email',
            'admin_status'
        )
}

async function add(user) {
    const [id] = await db('users').insert(user, 'id')
    return findById(id)
}
