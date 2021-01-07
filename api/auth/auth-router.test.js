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
    
describe('[POST] /auth/register', () => {
    it('New user can register with valid credentials. Returns message "Success registering!", adds user to DB', async () => {
        const expectedStatusCode = 201
        let users = await db('users')
        expect(users).toHaveLength(0)

        const res = await request(server)
            .post('/auth/register')
            .send({
                email: 'test@email.com',
                password: '1234',
                admin_status: 1
            })
            .expect(expectedStatusCode)
        expect(res.body.message).toBe('Success registering!')

        users = await db('users')
        expect(users).toHaveLength(1)
    })
    it('New user cannot register with duplicate credentials', async () => {
        const expectedStatusCode = 400
        const credentials = {
            email: 'test@email.com',
            password: '1234',
            admin_status: 1
        }
        await request(server)
            .post('/auth/register')
            .send(credentials)
            .expect(201)
        await request(server)
            .post('/auth/register')
            .send(credentials)
            .expect(expectedStatusCode)
    })
    it('New user cannot register with missing credentials', async () => {
        const expectedStatusCode = 400
        const credentials = {
            email: 'test@email.com',
            admin_status: 1
        }
        await request(server)
            .post('/auth/register')
            .send(credentials)
            .expect(expectedStatusCode)
    })
})

describe(('[POST] /auth/login'), () => {
    it('Registered user can login with valid credentials, returns a token.', async () => {
        const expectedStatusCode = 200

        await request(server)
            .post('/auth/register')
            .send({
                email: 'test@email.com',
                password: '1234',
                admin_status: 1
            })
        const res = await request(server)
            .post('/auth/login')
            .send({
                email: 'test@email.com',
                password: '1234'                
            })
            .expect(expectedStatusCode)
        expect(res.body.token).not.toBeNull()
    })
    it('New user cannot login with unregistered credentials.', async () => {
        const expectedStatusCode = 401

        await request(server)
            .post('/auth/login')
            .send({
                email: 'test@email.com',
                password: '1234'                
            })
            .expect(expectedStatusCode)
    })
})
