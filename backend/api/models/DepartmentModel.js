const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deptSchema = Schema({
  name: {
    type: String,
    required: true,
  },
});
module.exports = Department = mongoose.model("department", deptSchema);
