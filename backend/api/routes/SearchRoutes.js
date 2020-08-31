const router = require("express").Router();

const SearchSchema = require("../models/SearchModel");

router.get("/", (req, res, next) => {
  console.log(req);
  res.send({
    msg: "request received for /search",
    req: req.headers,
  });
});

router.post("/", (req, res, next) => {
  const searchQuery = new SearchSchema({
    name: req.body.name,
    subjectID: req.body.subjectID,
    subjectName: req.body.subjectName,
  });
  res.status(201).json({
    msg: "request received for /search",
    req: searchQuery,
  });
});

module.exports = router;
