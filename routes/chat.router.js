let router = require('express').Router()
const {
  send, view
} = require('../controlllers/chat.controller')
const jwtMiddleware = require('./middleware/jwtMiddleware')

router.get('/:inbox/view', jwtMiddleware, view)
router.post('/:inbox/send', jwtMiddleware, send)

module.exports = router