const { database } = require('./config/database'); // import the database connection
const Transaction = require('./models/transactions'); // import the Share model

// create the "shares" table in the database
Transaction.sync()
  .then(() => {
    console.log('Transactions table created successfully');

    // insert sample data into the "transactions" table
    return Transaction.bulkCreate([
      { portfolioId: 1, shareId:2, type: 'BUY', quantity: 12, price:100.00 },
      { portfolioId: 2, shareId:1, type: 'SELL', quantity: 3, price:120.00 },
      { portfolioId: 3, shareId:3, type: 'BUY', quantity: 7, price:1250.00 }
    ]);
  })
  .then(() => {
    console.log('Sample data inserted successfully');
    database.close();
  })
  .catch(error => {
    console.error('Error inserting sample data:', error);
  });

/*  userId: 3,
shareId: 2,
type: 'BUY',
quantity: 15,
price: 100.00 */