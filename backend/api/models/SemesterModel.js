const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const semSchema = Schema({
  sem: {
    type: Number,
    required: true,
  },
});
module.exports = Semester = mongoose.model("semseter", semSchema);
