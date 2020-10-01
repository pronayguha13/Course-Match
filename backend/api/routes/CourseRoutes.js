const express = require("express");
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

//DESC: CREATING A COURSE
router.post("/", async (req, res) => {
  const { subCode, deptID, sem } = req.body;
  const dept = await Department.findOne({ dept_code: deptID });
  try {
    if (dept) {
      console.log("dept", dept);
      const semester = await Semester.findOne({ sem: sem });
      if (semester) {
        const subject = await Subject.findOne({
          semester: semester,
          department: dept,
          code: subCode,
        });
        if (subject) {
          console.log("subject-->", subject);
          const searchedCourse = await Course.findOne({
            stream: dept,
            semester: semester,
            subject: subject,
          });
          if (searchedCourse) {
            console.log("searchedCourse->", searchedCourse);
            res.status(409).json({
              msg: "Course already exists",
              course: searchedCourse,
            });
          } else {
            const newCourse = new Course({
              stream: dept._id,
              semester: semester._id,
              subject: subject._id,
            });
            const createdCourse = await newCourse.save();
            console.log(createdCourse);
            res.status(200).json({
              Status: "course Created",
              newCourse: newCourse,
            });
          }
        } else {
          console.log("No Subject found");
          res.status(400).json("No Subject found");
        }
      } else {
        console.log("No Semester found");
        res.status(400).json("No Semester found");
      }
    } else {
      console.log("No department found");
      res.status(400).json("No department found");
    }
  } catch (err) {}
});

module.exports = router;
