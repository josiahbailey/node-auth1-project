const db = require('../data/db-config')

module.exports = {
  get,
  getBy,
  add
}

function get(id) {
  if (id) {
    return db('users')
      .where({ id })
      .first()
  } else {
    return db('users')
  }
}

function getBy(filter) {
  return db('users')
    .where(filter)
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id')

  return get(id)
}