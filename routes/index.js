const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("Hola Messi");
});

module.exports = router;
