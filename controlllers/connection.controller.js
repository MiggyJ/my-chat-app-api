const { Op } = require('sequelize')
const { Users, Connections, Inbox, UserInbox } = require('../models')

exports.search = async (req, res) => {
  try {
    const my_connections = await Connections.findAll({
      where: {
        [Op.or]: {
          recipientId: req.auth.id,
          senderId: req.auth.id
        },
        status: 'accepted'
      },
    })

    const all_users = await Users.findAll({
      where: { id: { [Op.not]: req.auth.id } },
      include: [
        {
          model: Connections,
          as: 'recipient',
          where: { status: 'pending' },
          required: false
        },
        {
          model: Connections,
          as: 'sent',
          where: { status: 'pending' },
          required: false
        }
      ]
    })

    const possible_connections = all_users.filter(el => my_connections.every(row => row.recipientId !== el.id && row.senderId !== el.id))

    res.send({
      error: false,
      data: possible_connections
    })
  } catch (error) {
    res.send({
      error: true,
      message: error
    })
  }
}

exports.request = async (req, res) => {
  try {
    const { recipientId } = req.body

    let connection = await Connections.create({
      senderId: req.auth.id,
      recipientId,
    })

    if (connection) {
      res.send({
        error: false,
        message: 'Connection request sent!'
      })
    }
  } catch (error) {
    res.send({
      error: true,
      message: error
    })
  }
}

exports.requestList = async (req, res) => {
  try {
    let data = await Connections.findAll({
      where: { recipientId: req.auth.id, status: 'pending' },
      include: ['sender']
    })

    if (data) {
      res.send({
        error: false,
        data
      })
    }
  } catch (error) {
    res.send({
      error: true,
      message: error
    })
  }
}

exports.update = async (req, res) => {
  const { action, id } = req.params
  try {
    const status = action === 'accept' ? 'accepted' : 'rejected'

    let connection = await Connections.findOne({ where: { id, status: 'pending' }, include: ['sender'] })

    if (connection) {
      connection.status = status
      await connection.save()

      const inbox = await Inbox.create()
      await UserInbox.create({ userId: req.auth.id, inboxId: inbox.id })
      await UserInbox.create({ userId: connection.sender.id, inboxId: inbox.id })

      res.send({
        error: false,
        message: 'You are now connected with ' + connection.sender.username
      })
    }

  } catch (error) {
    res.send({
      error: true,
      message: error
    })
  }
}