const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
const usersRouter = require('./users/users-router')

server.use(express.json())
server.use(helmet())
server.use(cors())

server.get('/', (req, res) => {
  res.send(`<h1>Users Authentication Practice API</h1>`)
})

server.use('/api/auth', usersRouter)

module.exports = server