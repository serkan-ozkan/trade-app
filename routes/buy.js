const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const buyController = require('../controllers/buy');
router.post('/', jsonParser, buyController.buy);

module.exports = router;
