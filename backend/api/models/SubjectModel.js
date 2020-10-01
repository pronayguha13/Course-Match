const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
  department: [
    {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  ],
});

module.exports = Subject = mongoose.model("Subject", subjectSchema);
