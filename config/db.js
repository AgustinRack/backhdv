require("dotenv").config();

const { Sequelize } = require("sequelize");
const db_name = process.env.db_name;
const db_host = process.env.host;

const db = new Sequelize(db_name, null, null, {
  host: db_host,
  dialect: "postgres",
  logging: false,
});

module.exports = db;
