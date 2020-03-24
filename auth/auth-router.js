const bcrypt = require('bcryptjs')

const router = require('express').Router()

const Users = require('../users/users-model')

router.post('/register', (req, res) => {
  const user = req.body
  const rounds = process.env.HASHING_ROUNDS || 12
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
  const user = req.body
  const { username, password } = user
  Users.getBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = {
          id: user.id,
          username: user.username
        }
        res.status(200).json({ message: `Hello and welcome ${user.username}!` })
      } else {
        res.status(401).json({ message: `Invalid username or password` })
      }
    })
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: "You won't get away that easily!!" })
      } else {
        res.status(200).json({ message: 'Logged out successfully' })
      }
    })
  } else {
    res.status(200).json({ message: 'Do you even exist?' })
  }
})


module.exports = router