const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  name: String,
  subjectID: String,
  subjectName: String,
});

module.exports = mongoose.model("Search", searchSchema);
