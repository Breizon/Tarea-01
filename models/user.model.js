const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const User = db.define('client', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'client',
    enum: ['client', 'employee'],
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available',
  },
});

module.exports = User;