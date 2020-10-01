const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
