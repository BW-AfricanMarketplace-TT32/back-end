const request = require('supertest')
const server = require('../server')
const db = require('../../database/dbConfig')

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

describe('Users router works', () => {
    it('Can get all users', async () => {
        const userLogin = {
            email: 'test@email.com',
            password: '1234'
        }
        await request(server).post('/auth/register').send(userLogin)
        const res = await request(server).post('/auth/login').send(userLogin)
        const foundUsers = await request(server).get(`/users`).set('authorization', res.body.token)
        expect(foundUsers.status).toBe(200)
    })
    it('Can get user by ID', async () => {
        const userLogin = {
            email: 'test@email.com',
            password: '1234'
        }
        await request(server).post('/auth/register').send(userLogin)
        const res = await request(server).post('/auth/login').send(userLogin)
        const foundUser = await request(server).get(`/users/${res.user_id}`).set('authorization', res.body.token)
        expect(foundUser.status).toBe(200)
    })
    it('Cannot get users without valid auth token', async () => {
        const userLogin = {
            email: 'test@email.com',
            password: '1234'
        }
        await request(server).post('/auth/register').send(userLogin)
        const foundUser = await request(server).get(`/users/1`).set('authorization', 0)
        expect(foundUser.status).toBe(401)
    })
})
