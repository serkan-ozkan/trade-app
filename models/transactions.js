const Sequelize = require('sequelize');

const { database } = require('../config/database');

const Transaction = database.define('transaction', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  portfolioId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  shareId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM('BUY', 'SELL'),
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

module.exports = Transaction;
