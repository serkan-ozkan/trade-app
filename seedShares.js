const { database } = require('./config/database'); // import the database connection
const Share = require('./models/shares'); // import the Share model

// create the "shares" table in the database
Share.sync()
  .then(() => {
    console.log('Shares table created successfully');

    // insert sample data into the "shares" table
    return Share.bulkCreate([
      { symbol: 'ABC', name:"ABC Company", price: 123.45 },
      { symbol: 'DEF', name: 'DEF Company', price: 456.78 },
      { symbol: 'GHI', name:'GHI Ltd', price: 789.12 }
    ]);
  })
  .then(() => {
    console.log('Sample data inserted successfully');
    database.close();
  })
  .catch(error => {
    console.error('Error inserting sample data:', error);
  });

