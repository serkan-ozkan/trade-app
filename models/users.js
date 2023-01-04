const Sequelize = require('sequelize');
const { database } = require('../config/database');
const { DataTypes } = require('sequelize');


const User = database.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = User;
