const express = require("express");
const app = express();
const mongoose = require("mongoose");

//mongoose setup
mongoose.connect(
  `mongodb+srv://courseMatchBackend:${process.env.MONGODB_PWD}@course-match.ywvgn.mongodb.net/Course-Match?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("MONGODB CONNECTED");
  }
);

//Morgan Setup
const morgan = require("morgan");
app.use(morgan("dev"));

//body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//Middleware for handling routes
app.use("/", (req, res, next) => {
  res.send({
    msg: "here is the home route",
  });
});

module.exports = app;
