exports.seed = function(knex) {
  return knex('locations')
    .then(function () {
      return knex('locations').insert([
        {location_name: 'Mombasa'},
        {location_name: 'Nairobi'},
        {location_name: 'Kisii'},
        {location_name: 'Embu'}
      ])
    })
}
