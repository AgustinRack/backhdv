const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  secret,
  editUser,
} = require("../controllers/userControllers");

router.post("/signup", signup);
router.post("/login", login);
/* router.post("/logout", logout);
router.get("/secret", secret);
router.put("/edit", editUser); */

module.exports = router;
