const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  name: String,
  studentRoll: Number,
});

module.exports = mongoose.model("Search", searchSchema);
