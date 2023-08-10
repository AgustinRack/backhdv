require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./config/db");
const PORT = process.env.SERVER_PORT;
const routes = require("./routes");
const { User, Visits, Properties, Favorites, Categories } = require("./models");

app.use(express.json());
app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`listening on port : ${PORT}`));
});
