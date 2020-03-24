exports.up = function (knex) {
  return knex.schema.createTable('users', urs => {
    urs.increments()

    urs.varchar('username', 128)
      .notNullable()
      .unique()

    urs.varchar('password', 128)
      .notNullable()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
};
