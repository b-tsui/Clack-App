'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    }
  }, {});
  User.associate = function (models) {
    User.belongsToMany(models.Channel, {
      through: "ChannelUsers",
      foreignKey: "userId",
      otherKey: "channelId"
    });
    User.hasMany(models.Channel, { foreignKey: 'userId' });
    User.hasMany(models.Message, { foreignKey: 'userId' });
  };

  User.prototype.validatePassword = function (password) {
    // because this is a model instance method, `this` is the user instance here:
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  return User;
};