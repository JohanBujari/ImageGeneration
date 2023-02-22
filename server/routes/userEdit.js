const express = require("express");

const User = require("../mongodb/models/user");

const router = express.Router();

router.route("/").put(async (req, res) => {
  const userId = req.params.id;
  const {firstName, lastName, email} = req.body;
  User.findOneAndUpdate(
   userId,
    {firstName: firstName, lastName:lastName, email:email},
    { new: true }
  )
    .then((updatedUser) =>
      res.status(200).json({ message: "Updated succesfully", updatedUser })
    )
    .catch((err) => res.status(400).json({ message: "not updated", err }));
});

module.exports = router;