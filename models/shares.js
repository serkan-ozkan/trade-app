const Sequelize = require('sequelize');

const { database } = require('../config/database');
const { DataTypes } = require('sequelize');


const Share = database.define('share', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isCapital(value) {
          if (value !== value.toUpperCase()) {
            throw new Error('Symbol must be all capital letters');
          }
        },
        isLength(value) {
          if (value.length !== 3) {
            throw new Error('Symbol must be exactly 3 characters long');
          }
        }
      }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Share;
