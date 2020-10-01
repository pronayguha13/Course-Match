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
      res.status(200).json(sub);
    })
    .catch((err) => {
      res.json(500).json(err.message);
    });
});

//desc:route for getting subjects by department
//method:GET
router.get("/:dept", (req, res) => {
  const { dept } = req.params;
  department.findOne({ dept_code: dept }).then((dep) => {
    if (dep) {
      console.log("dep", dep);
      subject
        .find({ department: dep._id })
        .populate("semester")
        .populate("department")
        .exec()
        .then((sub) => {
          console.log(sub);
          res.status(200).json(sub);
        })
        .catch((err) => {
          res.json(500).json(err.message);
        });
    } else {
      res.status(400).json(`No subject found with department: ${dept}`);
    }
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
        .populate("department")
        .exec()
        .then((sub) => {
          console.log(sub);
          res.status(200).json(sub);
        })
        .catch((err) => {
          res.json(500).json(err.message);
        });
    } else {
      res.status(400).json(`No subject found with semester: ${sem}`);
    }
  });
});

//desc:route for getting subjects by semester and by department
//method:GET
router.get("/search/:semDept", async (req, res) => {
  const { semDept } = req.params;
  const passedParams = semDept.split("_");
  const dept = passedParams[0];
  const sem = parseInt(passedParams[1]);
  console.log("passedParams", passedParams);
  const searchedSem = await semester.findOne({ sem: sem });
  if (searchedSem) {
    console.log("searchedSem", searchedSem);
    const searchedDept = await department.findOne({
      dept_code: dept,
    });
    if (searchedDept) {
      console.log("searchedDept", searchedDept);
      const searchedSubject = await subject
        .find({
          semester: searchedSem._id,
          department: searchedDept._id,
        })
        .populate("semester")
        .populate("department");
      if (searchedSubject && searchedSubject.length) {
        console.log("searchedSubject", searchedSubject);
        res.status(200).json({ subject: searchedSubject });
      } else {
        res
          .status(400)
          .json(
            `No subject found with department: ${dept} and semester:${sem}`
          );
      }
    } else {
      res.status(400).json(`No subject found with department: ${dept}`);
    }
  } else {
    res.status(400).json(`No subject found with semester: ${sem}`);
  }
});

//desc:Route for creating new subject
//method:POST

router.post("/", (req, res) => {
  const { name, code, deptCode, sem } = req.body;

  //check for existence of same subject before creating it
  let depID = [];
  console.log("deptID", depID);

  deptCode.forEach((element) => {
    console.log("element", element);
    department
      .findOne({
        dept_code: element,
      })
      .then((d) => {
        console.log("d", d);
        depID.push(d._id);
      });
  });

  subject
    .findOne({ code: code, department: depID })
    .then((sub) => {
      if (sub) {
        return res.status(409).json("Subject with the given code exists");
      }

      let semID;
      semester
        .findOne({ sem: sem })
        .exec()
        .then((s) => {
          semID = s._id;
          console.log("semID-->", semID);
          const newSubject = new subject({
            name: name,
            code: code,
            semester: semID,
            department: depID,
          });

          newSubject
            .save()
            .then((sub) => {
              console.log(sub);
              res.status(200).json(sub);
            })
            .catch((err) => {
              res.status(500).json(err.message);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json("Internal server error");
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
        res.status(400).json(`No subject exist with code:${subCode}`);
      }
    })
    .catch((err) => {
      res.status(500).json("Error!Unable to update");
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
          .then(() => res.status(200).json("Subject deleted"));
      } else {
        return res.status(404).json("subject does not exist");
      }
    })
    .catch((err) => {
      console.log("err", err);
      return res.status(500).json(err.message);
    });
});

module.exports = router;
