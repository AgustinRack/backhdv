const { Properties, Categories, Visits, Favorites } = require("../models");

const allProperties = async (req, res) => {
  Properties.findAll({
    include: {
      model: Categories,
    },
  }).then((properties) => {
    res.send(properties).status(200);
  });
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    Favorites.destroy({ where: { propertyId: id } });
    Visits.destroy({ where: { propertyId: id } });
    Properties.destroy({ where: { id } });

    res.status(202).send("Producto eliminado");
  } catch (error) {
    res.status(404).send(error);
  }
};

const editProperty = async (req, res) => {
  const {
    id,
    is_for_rent,
    province,
    size,
    bathrooms,
    bedrooms,
    country,
    neighborhood,
    address,
    description,
    price,
    img,
    imgs,
    categoryId,
  } = req.body;

  try {
    const property = await Properties.findOne({
      include: [Categories],
      where: { id },
    });
    property.is_for_rent = is_for_rent;
    property.province = province;
    property.price = price;
    property.country = country;
    property.neighborhood = neighborhood;
    property.address = address;
    property.size = size;
    property.bedrooms = bedrooms;
    property.bathrooms = bathrooms;
    property.description = description;
    property.img = img;
    property.imgs = imgs;
    property.categoryId = categoryId;
    await property.setCategory(categoryId);
    await property.save();

    await property.reload();

    res.send(property).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar la propiedad");
  }
};

const getPropertiesForRent = async (req, res) => {
  Properties.findAll({
    include: { model: Categories },
    where: { is_for_rent: true },
  })
    .then((properties) => {
      res.send(properties).status(200);
    })
    .catch((err) => res.status(404).send(err));
};

const getPropertiesForSale = async (req, res) => {
  Properties.findAll({
    include: { model: Categories },
    where: { is_for_rent: false },
  })
    .then((properties) => {
      res.send(properties).status(200);
    })
    .catch((err) => res.status(404).send(err));
};

//COMO ADMIN AGREGAR UNA PROPIEDAD

const createProperty = async (req, res) => {
  const {
    is_for_rent,
    province,
    size,
    bathrooms,
    bedrooms,
    country,
    neighborhood,
    address,
    description,
    price,
    img,
    imgs,
    categoryId,
  } = req.body;

  try {
    const property = await Properties.create({
      is_for_rent,
      province,
      size,
      bathrooms,
      bedrooms,
      country,
      neighborhood,
      address,
      description,
      price,
      img,
      imgs,
      categoryId,
    });
    await property.setCategory(categoryId);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear la propiedad");
  }
};

const getProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Properties.findOne({
      include: { model: Categories },
      where: { id },
    });

    if (!property) {
      return res.status(404).send("Propiedad no encontrada");
    }

    res.send(property);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al encontrar la propiedad");
  }
};

module.exports = {
  allProperties,
  deleteProperty,
  editProperty,
  getPropertiesForRent,
  getPropertiesForSale,
  createProperty,
  getProperty,
};
