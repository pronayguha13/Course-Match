const express = require("express");
const { exists } = require("../models/CourseModel");
const router = express.Router();

// import the course ,department,semster and subject model
const Course = require("../models/CourseModel");
const Department = require("../models/DepartmentModel");
const Semester = require("../models/SemesterModel");
const Subject = require("../models/SubjectModel");

//DESC:GET ALL THE  COURSE
router.get("/", async (req, res) => {
  const courses = await Course.find()
    .populate("stream")
    .populate("semester")
    .populate("subject");
  console.log("courses", courses);

  try {
    if (courses && courses.length) {
      console.log("courses-->", courses);
      res.status(200).json({ courses: courses });
    } else {
      console.log("no courses Found");
      res.status(404).json("No course found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err.message,
    });
  }
});

//DESC:GETTING COURSES BY SEMESTER
router.get("/sem/:sem", async (req, res) => {
  const { sem } = req.params;
  const semID = await Semester.findOne({ sem: sem });
  if (semID) {
    const courses = await Course.find({ semester: semID })
      .populate("stream")
      .populate("semester")
      .populate("subject");
    console.log("courses", courses);
    if (courses && courses.length) {
      console.log("courses-->", courses);
      res.status(200).json({
        message: `Here is the Course for semester ${sem}`,
        courses: courses,
      });
    } else {
      console.log("no courses Found");
      res.status(404).json({ mesaage: "No course found", courses: [] });
    }
  } else {
    console.log("No Semester Found");
    res.status(404).json({
      message: `No Semester found with code : ${sem}`,
      course: null,
    });
  }
});

//DESC:GETTING COURSES BY DEPARTMENT  and SEMESTER
router.post("/department/:department", async (req, res) => {
  const { department } = req.params;
  console.log("req.body", req.body);
  const { sem } = req.body;
  console.log("sem", sem);
  const deptID = await Department.findOne({ dept_code: department });
  if (deptID) {
    console.log("deptID", deptID);
    const semID = await Semester.findOne({ sem: sem });
    if (semID) {
      const course = await Course.findOne({
        stream: deptID._id,
        semester: semID._id,
      })
        .populate("stream")
        .populate("semester")
        .populate("subject");
      console.log("course", course);
      if (course) {
        console.log("course-->", course);
        res.status(200).json({
          message: `Here is the Course for Stream:${department} Semester: ${sem} `,
          course: course,
        });
      } else {
        console.log(`No course Found for ${department} Semester:${sem}`);
        res.status(404).json({
          mesaage: `No course Found for ${department} Semester:${sem}`,
          course: null,
        });
      }
    } else {
      console.log("No Semester Found");
      res.status(404).json({
        message: `No Semester found with code : ${sem}`,
        course: null,
      });
    }
  } else {
    console.log("No Department Found");
    res.status(404).json({
      message: `No department found with code : ${department}`,
      course: null,
    });
  }
});

//DESC: CREATING A COURSE
router.post("/", (req, res) => {
  const { subCode, deptID, sem } = req.body;
  Department.findOne({ dept_code: deptID })
    .then((dept) => {
      if (dept) {
        console.log("Department Found with code : -- > ", deptID);
        Semester.findOne({ sem: sem })
          .then((semester) => {
            if (semester) {
              let subjects = [];
              console.log("Semester Found");

              let subId = [];
              subCode.forEach((s) => {
                Subject.findOne({ code: s })
                  .then((sub) => {
                    console.log("sub", sub);
                    if (sub) {
                      subId.push(sub._id);
                    } else {
                      console.log("Subject Not Found with Code :", s);
                      res.status(400).json({
                        message: `Subject with code ${s} not Found`,
                        course: null,
                      });
                    }
                    console.log("Subject ID List:", subId);
                  })
                  .catch((err) => {
                    console.log("Error:->", err);
                    res
                      .status(500)
                      .json({ message: "Internal Server Error", course: null });
                  });
              });
              Course.findOne({
                stream: dept,
                semester: semester,
              }).then((course) => {
                if (course) {
                  console.log("course Exist");
                  res
                    .status(409)
                    .json({ message: "Course Exist", course: null });
                } else {
                  console.log("course DoesNot exists");
                  const newCourse = new Course({
                    stream: dept,
                    semester: semester,
                    subject: subId,
                  });
                  newCourse.save().then((newC) => {
                    console.log("Newly Created Course", newC);
                    res.status(200).json({
                      message: "Course Created Successfully",
                      course: newC,
                    });
                  });
                }
              });
            } else {
              console.log("Semester not found");
              res
                .status(400)
                .json({ message: "Semester Not found", course: null });
            }
          })
          .catch((err) => {
            console.log("Error-->", err);
            res
              .status(500)
              .json({ message: "Internal Server Error", course: null });
          });
        // res.status(200).json({ message: "Department Found", dept: dept });
      } else {
        console.log("department not found");
        res.status(400).json({ message: "department Not found", course: null });
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
  // res.status(200).json({ subjects: req.body.subCode });
});
module.exports = router;
