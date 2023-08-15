const User = require("./User");
const Visits = require("./Visits");
const Favorites = require("./Favorites");
const Properties = require("./Properties");
const Categories = require("./Categories");

User.hasMany(Favorites);
Favorites.belongsTo(User);

User.hasMany(Visits);
Visits.belongsTo(User);

Properties.hasMany(Visits);
Visits.belongsTo(Properties);

Properties.hasMany(Favorites);
Favorites.belongsTo(Properties);

Categories.hasMany(Properties);
Properties.belongsTo(Categories);

module.exports = { User, Visits, Properties, Favorites, Categories };
