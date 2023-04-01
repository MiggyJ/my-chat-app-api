'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Chats, { as: 'chat', foreignKey: 'senderId'})
      this.hasMany(models.Connections, { as: 'sent', foreignKey: 'senderId' })
      this.hasMany(models.Connections, { as: 'recipient', foreignKey: 'recipientId' })
      this.belongsToMany(models.Inbox, { as: 'inbox', through: models.UserInbox })
    }

    verify(password) {
      if (this.password)
        return bcrypt.compareSync(password, this.password)
      else
        return false
    }
  }
  Users.init({
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    isOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Users',
    hooks: {
      beforeCreate: async (user, options) => {
        if (user.password)
          user.password = await bcrypt.hash(user.password, 12)
      }
    },
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      }
    }
  });
  return Users;
};