exports.seed = function(knex) {
  return knex('users')
    .then(function () {
      return knex('users').insert([
        {email: 'harry@hogwarts.com', password: '$2a$08$0TsqQ2JZlgvOdwmm7nOXZuslR69Bm.2cvXsHI1KunE7qWuhZAedzy', admin_status: 0},
        {email: 'ron@hogwarts.com', password: '$2a$08$0rKGtQZYptivuIcsP2SnnON/sZYwsRof3KDUTbnlQ2jIcxcFk0LY.', admin_status: 0},
        {email: 'hermione@hogwarts.com', password: '$2a$08$Wp8X4BbHrnAzRlF./untgObvCZOwtSGkls5wBZhIA3TNkEDsLAdGC', admin_status: 1}
      ])
    })
}
