const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../mongodb/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const userToken = jwt.sign(
      { _id: newUser._id, email: newUser.email },
      SECRET_KEY
    );
    res
      .status(200)
      .cookie("userToken", userToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 90000),
      })
      .json({ message: "User Registered", user: newUser });
  } catch (err) {
    res.status(400).json({ message: "Register failed", err });
  }
});

module.exports = router;
