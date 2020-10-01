const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = Schema({
  stream: { type: Schema.Types.ObjectId, ref: "Department" },
  semester: { type: Schema.Types.ObjectId, ref: "Semester" },
  subject: { type: Schema.Types.ObjectId, ref: "Subject" },
});

module.exports = Course = mongoose.model("Course", courseSchema);
