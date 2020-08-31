const router = require("express").Router();

const SearchSchema = require("../models/SearchModel");

router.post("/", (req, res, next) => {
  // console.log("req:>>", req.body);
  // const searchValue = Object.values(req.body)[0];
  // console.log("searchValue", searchValue);
  // if (typeof searchValue === "string") {
  //   console.log(`Request for student with name: ${searchValue}`);
  // } else {
  //   console.log(`Request for student with ID: ${searchValue}`);
  // }
  res.status(201).json({
    msg: "request received for /search",
    req: req.body,
  });
});

module.exports = router;
