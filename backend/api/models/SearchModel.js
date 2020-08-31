const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  name: String,
  studentID: Number,
});

module.exports = mongoose.model("Search", searchSchema);
