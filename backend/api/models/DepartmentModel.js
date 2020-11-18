const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deptSchema = Schema({
  dept_code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
module.exports = Department = mongoose.model("Department", deptSchema);
