const bcrypt = require('bcryptjs')

const router = require('express').Router()

const Users = require('../users/users-model')

router.post('/register', (req, res) => {
  const user = req.body
  const rounds = process.env.HASHING_ROUNDS || 12
  // const hash = bcrypt.hashSync(user.password, rounds)
  // user.password = hash
  user.password = bcrypt.hashSync(user.password, rounds)

  if (user && user.password && user.username) {
    Users.add(user)
      .then(user => {
        res.status(201).json({ message: 'Successfully created new user', user: user })
      })
      .catch(err => {
        res.send(err)
      })
  } else {
    res.status(404).json({ message: 'User must contain username and password' })
  }
})

router.post('/login', (req, res) => {

})

router.get('/logout', (req, res) => {

})


module.exports = router