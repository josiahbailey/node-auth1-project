
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'test', password: '$2a$12$7LEWRTSZm2/op4IBDven/upXS68Gyxia4MUqOKKCDkzXetDyQWV0q' }
      ]);
    });
};
