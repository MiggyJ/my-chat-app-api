let router = require('express').Router()
const {
  list
} = require('../controlllers/inbox.controller')
const jwtMiddleware = require('./middleware/jwtMiddleware')

router.get('/list', jwtMiddleware, list)

module.exports = router