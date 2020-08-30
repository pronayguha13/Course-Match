const express = require("express");
const app = express();

//Morgan Setup
const morgan = require("morgan");
app.use(morgan("dev"));

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
module.exports = app;
