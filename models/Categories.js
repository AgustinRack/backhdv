const Sequelize = require("sequelize");
const db = require("../config/db");

class Categories extends Sequelize.Model {}

Categories.init(
  {
    categoryName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { sequelize: db, modelName: "categories" }
);

module.exports = Categories;
