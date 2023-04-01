'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Inbox, { as: 'inbox', })
      this.belongsTo(models.Users, { as: 'sender', foreignKey: 'senderId' })
    }
  }
  Chats.init({
    inboxId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Chats',
  });
  return Chats;
};