'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    isDM: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  Channel.associate = function (models) {
    Channel.belongsToMany(models.User, {
      through: "ChannelUsers",
      foreignKey: "channelId",
      otherKey: "userId"
    });
    Channel.belongsTo(models.User, { foreignKey: 'userId' });
    // Channel.belongsTo(models.ChannelUser, { foreignKey: "channelId" });
    Channel.hasMany(models.Message, { foreignKey: 'channelId' });
  };
  return Channel;
};