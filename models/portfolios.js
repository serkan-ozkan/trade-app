const Sequelize = require('sequelize');
const { database } = require('../config/database');
const { DataTypes, Transaction } = require('sequelize');


const Portfolio = database.define('portfolio', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    balance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
      }
    });

Portfolio.prototype.totalShares = async function(shareId) {
  const boughtShares = await Transaction.Sequelize.sum('quantity', {
    where: 
    {portfolioId: this.id,
      shareId,
    type: 'BUY'},
  });
  const soldShares = await Transaction.Sequelize.sum('quantity', {
    where: {portfolioId: this.id,shareId, type:'SELL'},
  });
  return boughtShares - soldShares;
}

module.exports = Portfolio;
