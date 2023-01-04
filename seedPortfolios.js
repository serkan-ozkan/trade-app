const { database } = require('./config/database'); // import the database connection
const Portfolio = require('./models/portfolios'); // import the User model

// create the "portfolio" table in the database
Portfolio.sync()
  .then(() => {
    console.log('Portfolio table created successfully');

    // insert sample data into the "portfolio" table
    return Portfolio.bulkCreate([
      { userId: 1, balance: 10000.00 },
      { userId: 2, balance: 5000.00 },
      { userId: 3, balance: 250 }
    ]);
  })
  .then(() => {
    console.log('Sample data inserted successfully');
    database.close();
  })
  .catch(error => {
    console.error('Error inserting sample data:', error);
  });

