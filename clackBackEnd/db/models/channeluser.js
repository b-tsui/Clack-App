'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChannelUser = sequelize.define('ChannelUser', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    channelId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});
  ChannelUser.associate = function (models) {

  };
  return ChannelUser;
};