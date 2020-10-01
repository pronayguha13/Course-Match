const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
//mongoose setup
mongoose.connect(
  `mongodb+srv://courseMatchBackend:${config.get(
    "MONGODB_PWD"
  )}@course-match.ywvgn.mongodb.net/Course-Match?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  () => {
    console.log("MONGODB CONNECTED");
  }
);

//Morgan Setup
const morgan = require("morgan");
app.use(morgan("dev"));

///body parser
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
const userRoutes = require("./api/routes/UserRoutes.js");
const homeRoutes = require("./api/routes/HomeRoutes");
const deptRoutes = require("./api/routes/DepartmentRoutes");
const subRoutes = require("./api/routes/SubjectRoutes.js");
const semRoutes = require("./api/routes/SemesterRoutes");
const courseRoutes = require("./api/routes/CourseRoutes");

//Middleware for handling routes
app.use("/search", searchRoutes);

app.use("/user", userRoutes);

app.use("/index", homeRoutes);

app.use("/admin/department", deptRoutes);

app.use("/admin/subject", subRoutes);
app.use("/admin/semester", semRoutes);
app.use("/admin/course", courseRoutes);

app.use("/", (req, res, next) => {
  res.json({
    msg: "here is the home route",
  });
});

module.exports = app;
