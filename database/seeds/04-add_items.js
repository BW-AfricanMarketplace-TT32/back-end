exports.seed = function(knex) {
  return knex('items')
    .then(function () {
      return knex('items').insert([
        {item_name: 'Eggs', item_description: 'From local hens', item_price: 4, user_id: 1 , category_id: 1, location_id: 1},
        {item_name: 'Agwedde Beans', item_description: 'Dried', item_price: 3, user_id: 2 , category_id: 2, location_id: 2},
        {item_name: 'Mangoes', item_description: 'Perfectly ripe, from local trees', item_price: 6, user_id: 3 , category_id: 3, location_id: 3},
        {item_name: 'Vanilla Beans', item_description: 'Unprocessed and pure', item_price: 18, user_id: 1 , category_id: 4, location_id: 4},
      ])
    })
}
