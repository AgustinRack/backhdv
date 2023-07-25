const { Properties, Favorites, Categories } = require("../models");

const createFavorite = async (req, res) => {
  try {
    const { user_id, properties_id } = req.body;

    const findFavorite = await Favorites.findOne({
      where: {
        userId: user_id,
        propertyId: properties_id,
      },
    });

    if (!findFavorite) {
      const favorite = await Favorites.create({
        user_id: user_id,
        properties_id: properties_id,
        userId: user_id,
        propertyId: properties_id,
      });

      res.status(200).send("Propiedad agregada a Favoritos");
    } else {
      Favorites.destroy({
        where: {
          userId: user_id,
          propertyId: properties_id,
        },
      });
      res.status(200).send("Propiedad eliminada de Favoritos");
    }
  } catch (error) {
    res.sendStatus(404);
  }
};

const allFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const allFavorites = await Favorites.findAll({
      where: { userId },
      include: { model: Properties, include: { model: Categories } },
    });

    res.status(200).send(allFavorites);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = { createFavorite, allFavorites };
