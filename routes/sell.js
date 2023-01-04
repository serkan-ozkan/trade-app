const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const sellController = require('../controllers/sell');
router.post('/', jsonParser, sellController.sell);

module.exports = router;
