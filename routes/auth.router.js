let router = require('express').Router()
const {
  register, login, logout, user
} = require('../controlllers/auth.controller')
const jwtMiddleware = require('./middleware/jwtMiddleware')

router.get('/user', jwtMiddleware, user)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', jwtMiddleware, logout)

module.exports = router