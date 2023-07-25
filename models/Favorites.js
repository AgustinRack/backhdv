const { Sequelize } = require("sequelize");
const db = require("../db");

class Favorites extends Sequelize.Model {}

Favorites.init(
  {
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    properties_id: { type: Sequelize.INTEGER, allowNull: false },
  },
  { sequelize: db, modelName: "favorites" }
);

module.exports = Favorites;
