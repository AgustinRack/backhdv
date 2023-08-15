const express = require("express");
const router = express.router();
const { Properties } = require("../models");

router.get("/all", propeertiesCard.allProperties);

router.get("/for-rent")
