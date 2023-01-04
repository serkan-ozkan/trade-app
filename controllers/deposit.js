const User = require('../models/users');
const Portfolio = require('../models/portfolios');

const deposit = async (req, res) => {
    try {
      const { portfolioId, amount } = req.body;
      if (!portfolioId || !amount || amount < 0 || !Number.isInteger(amount)) {
        return res.status(400).send({ message: 'Invalid input' });
      }
      const portfolio = await Portfolio.findByPk(portfolioId);
      if (!portfolio) {
        return res.status(400).send({ message: 'Portfolio not found' });
      }
      await portfolio.update({ balance: (parseFloat(portfolio.balance) + amount) });
      return res.send({ message: 'Deposit successful' });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  

module.exports = { deposit };
