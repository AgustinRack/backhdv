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
router.post("/logout", validateUser, logout);
router.get("/secret", validateUser, secret);
router.put("/edit", validateUser, editUser);

module.exports = router;
