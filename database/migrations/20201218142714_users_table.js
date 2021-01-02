exports.up = function(knex) {
    return knex.schema 
        .createTable('users', table => {
            table.increments('user_id')
            table.string('email', 128).unique().notNullable().index()
            table.string('password', 256).notNullable()
            table.boolean('admin_status').defaultTo(0).notNullable()
        })
        .createTable('locations', table => {
            table.increments('location_id')
            table.string('location_name', 128).unique().notNullable()
        })
        .createTable('categories', table => {
            table.increments('category_id')
            table.string('category_name', 128).unique().notNullable()
        })
        .createTable('items', table => {
            table.increments('item_id')
            table.string('item_name', 128).unique().notNullable().index()
            table.string('item_description', 256)
            table.integer('item_price').notNullable()
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            table.integer('location_id')
                .unsigned()
                .notNullable()
                .references('location_id')
                .inTable('locations')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            table.integer('category_id')
                .unsigned()
                .notNullable()
                .references('category_id')
                .inTable('categories')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
}

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('items')
        .dropTableIfExists('categories')
        .dropTableIfExists('locations')
        .dropTableIfExists('users')
}
