'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInbox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { as: 'contact', foreignKey: 'userId' })
      this.belongsTo(models.Inbox, { as: 'inbox', foreignKey: 'inboxId' })
    }
  }
  UserInbox.init({
    userId: DataTypes.INTEGER,
    inboxId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserInbox',
  });
  return UserInbox;
};