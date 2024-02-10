const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const SessionStore = require('connect-session-sequelize')(require('express-session').Store);

class Session extends Model {}

Session.init(
  {
    sid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    expires: {
      type: DataTypes.DATE,
    },
    data: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'session',
  }
);

const sessionStore = new SessionStore({
  db: sequelize,
});

module.exports = { Session, sessionStore };
