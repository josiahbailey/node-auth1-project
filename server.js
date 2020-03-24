const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')

const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const restricted = require('./auth/restricted')

const server = express()

const cookieConfig = {
  name: 'autho',
  secret: process.env.COOKIE_SECRET || 'ajds0ajd80jas0dja09',
  cookie: {
    maxAge: 1000 * 60 * 60, // persists session for 1 hour
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true
}

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(session(cookieConfig))

server.get('/', (req, res) => {
  res.send(`<h1>Users Authentication Practice API</h1>`)
})

server.use('/api/auth', authRouter)
server.use('/api/users', restricted, usersRouter)

module.exports = server