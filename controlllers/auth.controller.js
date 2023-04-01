require('dotenv').config()
const { Users } = require('../models')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const user = req.body
  try {
    let data = await Users.create(user)

    if (data) {
      res.send({
        error: 'false',
        message: 'Registration Successful!'
      })
    }
  } catch (err) {
    res.send({
      error: true,
      message: 'Username is already used.'
    })
  }
}

exports.login = async (req, res) => {
  const body = req.body
  let match = false

  let user = await Users.scope('withPassword').findOne({
    where: {
      username: body.username
    },
  })

  if (!user) return res.send({ error: true, message: 'User not found!' })

  else
    match = user.verify(body.password)


  console.log(match)
  if (match) {

    let { id, username } = user
    let data = { id, username }
    let expiresIn
    let expires

    if (body.remember) {
      expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 5)
      expiresIn = '5y'
    } else {
      expiresIn = '7h'
      expires = new Date(Date.now() + 1000 * 60 * 60 * 7)
    }

    let token = await jwt.sign(data, process.env.JWT_SECRET, { expiresIn })
    res.cookie('token', token, { httpOnly: true, signed: true, expires })
    res.cookie('user', data.id, { expires })

    user.isOnline = true
    await user.save()

    return res.send({
      error: false,
      message: 'Login Success!',
      data
    })
  } else {
    return res.send({
      error: true,
      message: 'Login Failed!',
    })
  }
}

exports.logout = async (req, res) => {
  const user = await Users.findByPk(req.auth.id)
  user.isOnline = false
  await user.save()
  res.clearCookie('token')
  res.clearCookie('user')
  res.send({
    error: false,
    message: 'You are now logged out.'
  })
}

exports.user = (req, res) => {
  res.json(req.auth)
}