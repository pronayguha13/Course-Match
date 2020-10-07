const express = require("express");

const router = express.Router();

//import subject model
const subject = require("../models/SubjectModel");
//import  semester and department model
const semester = require("../models/SemesterModel");
const department = require("../models/DepartmentModel");

//desc:Route for getting all the subjects
//method:GET

router.get("/", (req, res) => {
  subject
    .find()
    .populate("semester")
    .exec()
    .then((sub) => {
      console.log(sub);
      res.status(200).json({ subjects: sub });
    })
    .catch((err) => {
      res.json(500).json(err.message);
    });
});

//desc:route for getting subjects by semester
//method:GET
router.get("/sem/:sem", (req, res) => {
  const { sem } = req.params;
  semester.findOne({ sem: sem }).then((s) => {
    if (s) {
      console.log("s", s);
      subject
        .find({ semester: s._id })
        .populate("semester")
        .exec()
        .then((sub) => {
          console.log(sub);
          res.status(200).json({ subjects: sub });
        })
        .catch((err) => {
          res.json(500).json(err.message);
        });
    } else {
      res.status(400).json(`No subject found with semester: ${sem}`);
    }
  });
});

//desc:Route for creating new subject
//method:POST

router.post("/", (req, res) => {
  const { name, code, sem } = req.body;
  //check for existence of semester
  semester
    .findOne({ sem: sem })
    .then((s) => {
      if (s) {
        subject.findOne({ code: code }).then((sub) => {
          //check for existence of same subject before creating it
          if (sub) {
            sub
              .populate("semester")
              .execPopulate()
              .then((s) => {
                console.log("Subject--->", s);
                res.status(409).json({
                  message: "Subject exist with given code ",
                  subject: s,
                  subjects: null,
                });
              })
              .catch((err) => {
                console.log(
                  "error while searching for duplicate subject---------",
                  err
                );
                res.status(500).json({
                  message: "Error!while searching for duplicaate subject ",
                  subjects: null,
                });
              });
          }
          //if no subject found creating new subject with given info
          else {
            console.log("---------------Creating new Subject-----------------");

            const newSubject = new subject({
              name: name,
              code: code,
              semester: s._id,
            });

            newSubject
              .save()
              .then((newSub) => {
                console.log("new Subject:", newSub);
                res.status(200).json({
                  message: "New Subject created",
                  newSubject: newSub,
                });
              })
              .catch((err) => {
                console.log("Error from line:88", err);
                res.status(500).json({
                  message: "Error!!Cannot create new subjects",
                  newSubject: null,
                });
              });
          }
        });
      } else {
        res.status(400).json({ message: "Invalid semester", subject: null });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error", subjects: null });
    });
});

//desc:route for deleting a single subject
//method:DELETE
router.delete("/:sub_code", (req, res) => {
  const { sub_code } = req.params;
  subject
    .findOne({ code: sub_code })
    .then((sub) => {
      if (sub) {
        subject
          .deleteOne({ _id: sub._id })
          .then(() =>
            res
              .status(200)
              .json({ message: "Subject deleted", deletedSub: sub })
          );
      } else {
        return res
          .status(404)
          .json({ message: "subject does not exist", deletedSub: null });
      }
    })
    .catch((err) => {
      console.log("err", err);
      return res.status(500).json({ message: err.message, deletedSub: null });
    });
});

module.exports = router;
