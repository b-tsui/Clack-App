'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    channelId: DataTypes.INTEGER
  }, {});
  Message.associate = function (models) {
    Message.belongsTo(models.User, { foreignKey: 'userId' });
    Message.belongsTo(models.Channel, { foreignKey: 'channelId' });
  };
  return Message;
};