const User = require('../models/users');
const Portfolio = require('../models/portfolios');
const Share = require('../models/shares');
const Transaction = require('../models/transactions');

const buy = async (req, res, next) => {
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
    if(quantity <= 0){
      return res.status(400).send({message: 'Quantity must be a positive integer.'})
    }
    const currentPrice = share.price;
    const totalCost = currentPrice * quantity;
    if (totalCost > portfolio.balance) {
      return res.status(400).send({ message: 'Insufficient balance' });
    }
    const transaction = await Transaction.create({
      portfolioId: portfolio.id,
      shareId,
      quantity,
      price: currentPrice,
      type: 'BUY',
    });
    await portfolio.update({ balance: portfolio.balance - totalCost });
    return res.status(200).send(transaction);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { buy };
