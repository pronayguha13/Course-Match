const express = require("express");
const router = express.Router();

//import department model
const department = require("../models/DepartmentModel");

//@desc:route for creating new department
//@method:POST
router.post("/", (req, res, next) => {
  const { dept_code, name } = req.body;

  department.findOne({ dept_code: dept_code }).then((dept) => {
    if (dept) {
      return res.status(409).json({ msg: "Department exists" });
    }
    const stream = new department({
      dept_code: dept_code,
      name: name,
    });

    stream
      .save()
      .then((resp) => {
        console.log(resp);
        res.status(201).json("Department Created");
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ errorReason: err });
      });
  });
});

router.get("/get", (req, res) => {
  department
    .find()
    .then((dept) => {
      res.status(200).json({ dept: dept });
    })
    .catch((err) => {
      console.log("err-->", err);
      res.status(400).json({ dept: dept });
    });
});

module.exports = router;
