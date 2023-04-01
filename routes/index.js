const express = require('express')

let app = express()

// API Routes
app.use('/auth', require('./auth.router'))
app.use('/connection', require('./connection.router'))
app.use('/inbox', require('./inbox.router'))
app.use('/chat', require('./chat.router'))

module.exports = app