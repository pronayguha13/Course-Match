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
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

//CORS ISSUE FIXING
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-COntrol-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});
//route files
const searchRoutes = require("./api/routes/SearchRoutes");

//Middleware for handling routes
app.use("/search", searchRoutes);
app.use("/", (req, res, next) => {
  res.send({
    msg: "here is the home route",
  });
});

module.exports = app;
