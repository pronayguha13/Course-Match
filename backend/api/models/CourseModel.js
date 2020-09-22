const mongoose = require("mongoose");
const department = require("./DepartmentModel");

const Schema = mongoose.Schema;

const courseSchema = Schema({
  _id: Schema.Types.ObjectId,
  stream: { type: Schema.Types.ObjectId, ref: department },
});

module.exports = Course = mongoose.model("course", courseSchema);
