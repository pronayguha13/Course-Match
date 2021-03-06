const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");

router.get("/", (req, res, next) => {
  User.countDocuments({}, (err, count) => {
    if (err) {
      return res.status(500).json("Unable To process request");
    }
    return res.status(200).json({ count: count });
  });
});

module.exports = router;
