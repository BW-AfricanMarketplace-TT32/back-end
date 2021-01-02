const db = require('../../database/dbConfig')

module.exports = {
    find,
    findBy,
    findByItemId,
    add,
    addCategory,
    addLocation,
    update,
    remove,
    findAllByUserId,
    findCategories,
    findLocations
}

function find() {
    return db('items as i')
        .join('users as u', 'u.user_id', 'i.user_id')
        .join('categories as c', 'c.category_id', 'i.category_id')
        .join('locations as l', 'l.location_id', 'i.location_id')
        .select(
            'i.item_id', 
            'i.item_name', 
            'i.item_description', 
            'i.item_price',
            'u.email as vendor',
            'c.category_name',
            'l.location_name'
        )

}
function findBy(filter) {
    return db('items as i').where(filter)
        .join('users as u', 'u.user_id', 'i.user_id')
        .join('categories as c', 'c.category_id', 'i.category_id')
        .join('locations as l', 'l.location_id', 'i.location_id')
        .select(
            'i.item_id', 
            'i.item_name', 
            'i.item_description', 
            'i.item_price',
            'u.email as vendor',
            'c.category_name',
            'l.location_name'
        )
}
function findByItemId(id) {
    return db('items as i').where('item_id', id)
        .join('users as u', 'u.user_id', 'i.user_id')
        .join('categories as c', 'c.category_id', 'i.category_id')
        .join('locations as l', 'l.location_id', 'i.location_id')
        .select(
            'i.item_id', 
            'i.item_name', 
            'i.item_description', 
            'i.item_price',
            'u.email as vendor',
            'c.category_name',
            'l.location_name'
        )
}
function findAllByUserId(id) {
    return db('items as i').where('user_id', id)
        .join('users as u', 'u.user_id', 'i.user_id')
        .join('categories as c', 'c.category_id', 'i.category_id')
        .join('locations as l', 'l.location_id', 'i.location_id')
        .select(
            'i.item_id', 
            'i.item_name', 
            'i.item_description', 
            'i.item_price',
            'u.email as vendor',
            'c.category_name',
            'l.location_name'
        )
}
function findCategories() {
    return db('categories')
}
function findLocations() {
    return db('locations')
}
async function add(item) {
    const [id] = await db('items').insert(item)
    return db('items as i').where('item_id', id).first()
        .join('users as u', 'u.user_id', 'i.user_id')
        .join('categories as c', 'c.category_id', 'i.category_id')
        .join('locations as l', 'l.location_id', 'i.location_id')
        .select(
            'i.item_id', 
            'i.item_name', 
            'i.item_description', 
            'i.item_price',
            'u.email as vendor',
            'c.category_name',
            'l.location_name'
        )
}
async function addCategory(cat) {
    const [id] = await db('categories').insert(cat)
    return db('categories').where('category_id', id).first()
}
async function addLocation(loc) {
    const [id] = await db('locations').insert(loc)
    return db('locations').where('location_id', id).first()
}
async function update(id, item) {
    await db('items').where('item_id', id).update(item)
    return db('items as i').where('item_id', id)
        .join('users as u', 'u.user_id', 'i.user_id')
        .join('categories as c', 'c.category_id', 'i.category_id')
        .join('locations as l', 'l.location_id', 'i.location_id')
        .select(
            'i.item_id', 
            'i.item_name', 
            'i.item_description', 
            'i.item_price',
            'u.email as vendor',
            'c.category_name',
            'l.location_name'
        )
}
function remove(id) {
    return db('items').where('item_id', id).del()
}
