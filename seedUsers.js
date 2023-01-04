const { database } = require('./config/database'); // import the database connection
const User = require('./models/users'); // import the User model

// create the "users" table in the database
User.sync()
  .then(() => {
    console.log('Users table created successfully');

    // insert sample data into the "users" table
    return User.bulkCreate([
      { name: 'Serkan', email: 'serkan@example.com' },
      { name: 'Ahmet', email: 'ahmet@example.com' },
      { name: 'Mehmet', email: 'mehmet@example.com' }
    ]);
  })
  .then(() => {
    console.log('Sample data inserted successfully');
    database.close();
  })
  .catch(error => {
    console.error('Error inserting sample data:', error);
  });

