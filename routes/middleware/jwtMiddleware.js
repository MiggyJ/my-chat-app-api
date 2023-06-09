const { expressjwt: jwt } = require('express-jwt')
require('dotenv').config()

const jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET,
    getToken: req => req.signedCookies.token,
    algorithms: ['HS256']
})

module.exports = jwtMiddleware