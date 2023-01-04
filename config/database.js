const Sequelize = require('sequelize');
const database = new Sequelize("postgres://dozooyej:UbSWpKCaC09QlvK0zGLQjYWZQIGJ8B8s@mel.db.elephantsql.com/dozooyej");

module.exports = { database };