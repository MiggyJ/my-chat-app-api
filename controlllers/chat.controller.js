const { Users, Chats, Inbox } = require('../models')

exports.view = async (req, res) => {
  const { inbox } = req.params
  try {
    const chat = await Chats.findAll({
      where: { inboxId: inbox },
      include: ['sender'],
      order: [['createdAt', 'asc']]
    })

    if (chat) {
      res.send({
        error: false,
        data: chat
      })
    }
  } catch (error) {
    res.send({
      error: true,
      message: error
    })
  }
}

exports.send = async (req, res) => {
  const { inbox } = req.params
  try {
    const chat = await Chats.create({
      inboxId: inbox,
      senderId: req.auth.id,
      content: req.body.content
    })

    if (chat) {
      res.send({
        error: false,
        data: chat,
      })
    }

  } catch (error) {
    res.send({
      error: true,
      message: error
    })
  }
}