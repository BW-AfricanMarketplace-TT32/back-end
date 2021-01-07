const Users = require('./users-model')
const db = require('../../database/dbConfig')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    jest.setTimeout(20000);
    await db('users').truncate()
})
afterAll(async () => {
    await db.destroy()
})

describe('Users model works', () => {
    it('Users can be added to the db', async () => {
        let users = await db('users')
        expect(users).toHaveLength(0)

        await Users.add({ email: 'test1@email.com', password: '1234', admin_status: 1 })
        await Users.add({ email: 'test2@email.com', password: '1234', admin_status: 0 })

        users = await db('users')
        expect(users).toHaveLength(2)
    })
    it('Users can be found and listed', async () => {
        await Users.add({ email: 'test1@email.com', password: '1234', admin_status: 1 })
        await Users.add({ email: 'test2@email.com', password: '1234', admin_status: 0 })

        const res = await Users.find()
        expect(res).toHaveLength(2)
    })
    it('Users can be found by ID', async () => {
        await Users.add({ email: 'test1@email.com', password: '1234', admin_status: 1 })

        const res = await Users.findById(1)
        expect(res.email).toBe('test1@email.com')
    })
})
