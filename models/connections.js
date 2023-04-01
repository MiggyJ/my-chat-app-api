'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Connections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { as: 'sender', foreignKey: 'senderId'})
      this.belongsTo(models.Users, { as: 'recipient', })
    }
  }
  Connections.init({
    senderId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'accepted', 'rejected']]
      }
    }
  }, {
    sequelize,
    modelName: 'Connections',
  });
  return Connections;
};