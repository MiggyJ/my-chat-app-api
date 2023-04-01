'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inbox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Chats, { as: 'chat', })
      this.hasMany(models.UserInbox, { as: 'usersInbox', foreignKey: 'inboxId'})
      this.belongsToMany(models.Users, { as: 'users', through: models.UserInbox })
    }
  }
  Inbox.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Inbox',
  });
  return Inbox;
};