const { Sequelize } = require("sequelize");
const db = require("../db");

class Properties extends Sequelize.Model {}

Properties.init(
  {
    is_for_rent: { type: Sequelize.BOOLEAN, allowNull: false },
    price: { type: Sequelize.BIGINT, allowNull: false },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    province: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    neighborhood: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    size: { type: Sequelize.INTEGER, allowNull: false },
    bedrooms: { type: Sequelize.INTEGER, allowNull: false },
    bathrooms: { type: Sequelize.INTEGER, allowNull: false },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    img: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imgs: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { sequelize: db, modelName: "properties" }
);

module.exports = Properties;
