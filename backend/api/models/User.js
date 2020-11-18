const mongoose = require("mongoose");

//import model
const dept = require("./DepartmentModel");

//Schema  for user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roll_number: {
    type: Number,
    required: true,
  },
  stream: {
    type: mongoose.Schema.Types.ObjectId,
    ref: dept,
  },
  // semester: {
  //   type: Number,
  //   required: true,
  // },
});

module.exports = User = mongoose.model("user", userSchema);
//module.exports = mongoose.model("user",userSchema)
