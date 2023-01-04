const express = require('express');
const buyRoute = require('./routes/buy');
const sellRoute = require('./routes/sell');
const depositRoute = require('./routes/deposit');
const withdraw = require('./routes/withdraw');


const app = express();
const port = 3000;

app.use('/buy', buyRoute);
app.use('/sell', sellRoute);
app.use('/deposit', depositRoute);
app.use('/withdraw', withdraw);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
