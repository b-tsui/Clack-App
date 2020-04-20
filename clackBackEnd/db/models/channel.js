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
    Channel.belongsTo(models.User, { foreignKey: "userId" });
    Channel.belongsTo(model.ChannelUser, { foreignKey: "channelId" });
    Channel.hasMany(model.Message, { foreignKey: 'channelId' });
  };
  return Channel;
};