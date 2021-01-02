exports.seed = function(knex) {
  return knex('categories')
    .then(function () {
      return knex('categories').insert([
        {category_name: 'Animal Products'},
        {category_name: 'Dry Goods'},
        {category_name: 'Fruits and Vegetables'},
        {category_name: 'Other'}
      ])
    })
}
