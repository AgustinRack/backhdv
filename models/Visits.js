const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

class Visits extends Sequelize.Model {}

Visits.init(
  {
    date: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    schedule: { type: Sequelize.INTEGER, allowNull: false },
  },
  { sequelize: db, modelName: "visits" }
);

module.exports = Visits;
