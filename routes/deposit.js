const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();


const depositController = require('../controllers/deposit');

router.post('/', jsonParser, depositController.deposit);

module.exports = router;
