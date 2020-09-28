const express = require("express");
const router = express.Router();

//import department model
const department = require("../models/DepartmentModel");

router.get("/", (req, res) => {
  department
    .find()
    .then((dept) => {
      //   console.log(dept);
      res.json(dept);
    })
    .catch((err) => {
      console.log("err-->", err);
      res.status(400).send("error");
    });
});

//@desc:route for creating new department
//@method:POST
router.post("/", (req, res, next) => {
  const { dept_code, name } = req.body;
  department.findOne({ dept_code: dept_code }).then((dept) => {
    if (dept) {
      return res.status(409).send("Department exists");
    }
    const stream = new department({
      dept_code: dept_code,
      name: name,
    });

    stream
      .save()
      .then((resp) => {
        console.log(resp);
        res.status(201).send("Department Created");
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send("Error");
      });
  });
});

module.exports = router;
