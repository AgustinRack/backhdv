const express = require("express");
const app = express();
const db = require("./config/db");
const PORT = process.env.SERVER_PORT;

app.use(express.json());

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`listening on port : ${PORT}`));
});
