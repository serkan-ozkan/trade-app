const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();


const withdrawController = require('../controllers/withdraw');

router.post('/', jsonParser, withdrawController.withdraw);

module.exports = router;
