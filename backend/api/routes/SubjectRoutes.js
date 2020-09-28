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
    .populate("department")
    .exec()
    .then((sub) => {
      console.log(sub);
      res.status(200).send(sub);
    })
    .catch((err) => {
      res.send(500).send(err.message);
    });
});

//desc:Route for creating new subject
//method:POST

router.post("/", (req, res) => {
  const { name, code, deptCode, sem } = req.body;

  //check for existence of same subject before creating it
  subject
    .findOne({ code: code })
    .then((sub) => {
      if (sub && sub.dept_code === deptCode) {
        return res.status(409).send("Subject with the given code exists");
      }
      let deptID, semID;
      semester
        .findOne({ sem: sem })
        .exec()
        .then((s) => {
          semID = s._id;
          console.log("semID-->", semID);
        })
        .catch((err) => {
          console.log(err);
        });

      department
        .findOne({ dept_code: deptCode })
        .then((dept) => {
          deptID = dept._id;
          console.log("deptID-->", deptID);
          const newSubject = new subject({
            name: name,
            code: code,
            semester: semID,
            department: deptID,
          });

          newSubject
            .save()
            .then((sub) => {
              console.log(sub);
              res.status(200).json(sub);
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Internal server error");
    });
});

//desc:update a subject with given code
//method:PATCH

router.patch("/:subCode", (req, res) => {
  const { subCode } = req.params;
  subject
    .findOne({ code: subCode })
    .then((subj) => {
      if (subj) {
        for (let b in req.body) {
          subj[b] = req.body[b];
        }

        subj.save();
        res.status(201).json(subj);
      } else {
        res.status(400).send(`No subject exist with code:${subCode}`);
      }
    })
    .catch((err) => {
      res.status(500).send("Error!Unable to update");
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
          .then(() => res.status(200).send("Subject deleted"));
      } else {
        return res.status(404).send("subject does not exist");
      }
    })
    .catch((err) => {
      console.log("err", err);
      return res.status(500).send(err.message);
    });
});

module.exports = router;
