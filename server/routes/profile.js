const express = require("express");

const User = require("../mongodb/models/user");

const router = express.Router();

router.route("/").get(async (req, res) => {
  const userId = req.params.id;
  User.findOne(userId)
    .then((user) =>
      res.status(200).json({ message: "user by id retrieved", user })
    )
    .catch((err) =>
      res.status(400).json({ message: "user by id not retrieved", err })
    );
});

module.exports = router;
