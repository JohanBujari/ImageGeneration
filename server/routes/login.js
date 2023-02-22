const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const dotenv = require("dotenv");

const User = require("../mongodb/models/user");

dotenv.config();

const router = express.Router();

router.route("/").post(async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) {
    res.status(400).json({ messageFields: "User does not exist" });
  }
  try {
    const isPwdValid = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!isPwdValid) {
      res.status(400).json({ messagePass: "Incorrect email or password" });
    } else {
      const userToken = jwt.sign(
        { _id: existingUser._id, email: existingUser.email },
        SECRET_KEY
      );
      res
        .status(200)
        .cookie("userToken", userToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 90000),
        })
        .json({ message: "User Logged in", user: existingUser });
    }
  } catch (err) {}
});

module.exports = router;
