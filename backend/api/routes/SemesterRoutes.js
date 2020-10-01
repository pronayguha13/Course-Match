const express = require("express");

const router = express.Router();

const semester = require("../models/SemesterModel");

//desc:Route for getting all the semester
//method:GET

router.get("/", (req, res) => {
  semester
    .find()
    .exec()
    .then((sem) => {
      console.log(sem);
      res.status(200).json(sem);
    })
    .catch((err) => {
      res.json(500).json(err.message);
    });
});

//desc:Route for creating new semester
//method:POST

router.post("/", (req, res) => {
  const { sem } = req.body;
  semester.findOne({ sem: sem }).then((s) => {
    if (s) {
      return res.status(409).json("Semester exists");
    }
    const newSem = new semester({
      sem: sem,
    });

    newSem
      .save()
      .then((resp) => {
        console.log(resp);
        res.status(201).json("Semester Created");
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json("Error");
      });
  });
});

module.exports = router;
