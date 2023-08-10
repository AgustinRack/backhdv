const Sequelize = require("sequelize");
const db = require("../config/db");

class Favorites extends Sequelize.Model {}

Favorites.init(
  {
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    properties_id: { type: Sequelize.INTEGER, allowNull: false },
  },
  { sequelize: db, modelName: "favorites" }
);

module.exports = Favorites;
