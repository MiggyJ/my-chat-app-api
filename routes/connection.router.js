let router = require('express').Router()
const {
  requestList, request, update, search
} = require('../controlllers/connection.controller')
const jwtMiddleware = require('./middleware/jwtMiddleware')

router.get('/search', jwtMiddleware, search)
router.get('/requestList', jwtMiddleware, requestList)
router.post('/request', jwtMiddleware, request)
router.put('/:id/:action', jwtMiddleware, update)

module.exports = router