const request = require('supertest')
const server = require('./server')
const db = require('../database/dbConfig')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    jest.setTimeout(20000)
    await db('users').truncate()
})
afterAll(async () => {
    await db.destroy()
})

describe('server.js module', () => {
    it('is in the testing environment', () => {
        expect(process.env.DB_ENV).not.toBe('development')
        expect(process.env.DB_ENV).not.toBe('production')
        expect(process.env.DB_ENV).toBe('testing')
    })
    it('[GET] /', () => {
        return request(server)
            .get('/')
            .expect({ api: 'up' })
    })
})