const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const dotenv = require("dotenv");

const User = require("../mongodb/models/user");

dotenv.config();

const router = express.Router();

router.route("/").post(async (req, res) => {
  res.clearCookie("userToken");
  res.status(200).json({ message: "Successfully logged out!" });
});

module.exports = router;
