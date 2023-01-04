const User = require('../models/users');
const Portfolio = require('../models/portfolios');
const Share = require('../models/shares');
const Transaction = require('../models/transactions');
const { Sequelize } = require('sequelize');

const sell = async (req, res) => {
  try {
    const { shareId, quantity, userId } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    const share = await Share.findByPk(shareId);
    if (!share) {
      return res.status(400).send({ message: 'Invalid share' });
    }
    const portfolio = await Portfolio.findOne({ where: { userId } });
    if (!portfolio) {
      return res.status(400).send({ message: 'Portfolio not found' });
    }
    if (quantity <= 0) {
      return res.status(400).send({message: 'Quantity must be a positive integer.'});
    }
 
    const boughtSum = await Transaction.sum('quantity', {
      where: {
        type:'BUY',
        portfolioId: portfolio.id,
        shareId:share.id
      }
    });

    const totalBought = boughtSum ? boughtSum : 0;

    const soldSum = await Transaction.sum('quantity', {
      where: {
        type:'SELL',
        portfolioId: portfolio.id,
        shareId:share.id
      }
    });

    const totalSold = soldSum ? soldSum: 0;

    const totalShares = totalBought-totalSold;

    const currentPrice = share.price;
    if (quantity > totalShares) {
      return res.status(400).send({ message: 'Insufficient share count' });
    }

    const totalCost = currentPrice * quantity;

    const transaction = await Transaction.create({
      portfolioId: portfolio.id,
      shareId,
      quantity,
      price: currentPrice,
      type: 'SELL',
    });
    await portfolio.update({ balance: parseFloat(portfolio.balance) + parseFloat(totalCost) });
    return res.send(transaction);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { sell };
