const { Op } = require('sequelize')
const { Users, UserInbox, Inbox } = require('../models')

exports.list = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { id: req.auth.id },
      include: {
        model: Inbox,
        as: 'inbox',
        attributes: ['id']
      }
    })

    const inbox_ids = user.inbox.map(el => el.id)
    const contacts = await Inbox.findAll({
      where: { id: { [Op.in]: [...inbox_ids] } },
      include: {
        model: UserInbox,
        as: 'usersInbox',
        where: { userId: { [Op.not]: req.auth.id } },
        include: ['contact']
      }
    })

    const data = contacts.map(el => ({
      id: el.id,
      contact: el.usersInbox[0].contact
    }))

    res.send({
      error: false,
      data
    })

  } catch (error) {
    res.send({
      error: true,
      message: error
    })
  }
}