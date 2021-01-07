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

describe('Items router works', () => {
    it('items are protected and require token to view', async () => {
        const items = await request(server).get('/items')
        expect(items.status).toBe(401)
    })
    it('can find all items', async () => {
        const userLogin = {
            email: 'test@email.com',
            password: '1234'
        }
        await request(server).post('/auth/register').send(userLogin)
        const res = await request(server).post('/auth/login').send(userLogin)
        const items = await request(server).get(`/items`).set('authorization', res.body.token)
        expect(items.status).toBe(200)
    })
    it('can find all categories', async () => {
        const userLogin = {
            email: 'test@email.com',
            password: '1234'
        }
        await request(server).post('/auth/register').send(userLogin)
        const res = await request(server).post('/auth/login').send(userLogin)
        const categories = await request(server).get(`/items/categories/list`).set('authorization', res.body.token)
        expect(categories.status).toBe(200)
    })
    it('can find all locations', async () => {
        const userLogin = {
            email: 'test@email.com',
            password: '1234'
        }
        await request(server).post('/auth/register').send(userLogin)
        const res = await request(server).post('/auth/login').send(userLogin)
        const locations = await request(server).get(`/items/locations/list`).set('authorization', res.body.token)
        expect(locations.status).toBe(200)
    })
    it('can add categories, returns 201 status', async () => {
        const userLogin = {
            email: 'test@email.com',
            password: '1234',
        }
        await request(server).post('/auth/register').send({ ...userLogin, admin_status: 1 })
        const res = await request(server).post('/auth/login').send(userLogin)
        const categories = await request(server).post(`/items/categories`).send({ category_name: "Spellbooks" }).set('authorization', res.body.token)
        expect(categories.status).toBe(201)
    })
    it('can add locations, returns 201 status', async () => {
        const userLogin = {
            email: 'test@email.com',
            password: '1234'
        }
        await request(server).post('/auth/register').send({ ...userLogin, admin_status: 1 })
        const res = await request(server).post('/auth/login').send(userLogin)
        const locations = await request(server).post(`/items/locations`).send({ location_name: "Hogwarts" }).set('authorization', res.body.token)
        expect(locations.status).toBe(201)
    })
    it('can add items, returns 201 status', async () => {
        const userLogin = {
            email: 'test@email.com',
            password: '1234'
        }
        await request(server).post('/auth/register').send({ ...userLogin, admin_status: 1 })
        const res = await request(server).post('/auth/login').send(userLogin)
        const item = await request(server).post(`/items`)
            .send({
                item_name: 'Oranges',
                item_description: 'Yummy',
                item_price: 12,
                location_id: 1,
                category_id: 3
            })
            .set('authorization', res.body.token)
        expect(item.status).toBe(201)
    })
})
