const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.send({
    msg: "Get request for /user route",
  });
});

router.post("/", (req, res, next) => {
  const { name, email, password, roll_number } = req.body;
  if (!name || !email || !password) {
    res.status(400).send("Please enter a valid email and password ");
  }
  //check for existing user
  User.findOne({ roll_number }).then((user) => {
    if (user) res.status(400).send("User Already exist");

    const newUser = new User({
      name,
      email,
      password,
      roll_number,
    });
    //create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            {
              id: user.id,
            },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                },
              });
            }
          );
        });
      });
    });
  });
});

router.post("/auth", (req, res, next) => {
  const { email, password } = req.body;
  if (!roll_number || !password) {
    res.status(400).send("Please enter a valid email and password ");
  }
  //check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).send("User Doesnot exist");

    //Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).send("Invalid Credential");

      jwt.sign(
        {
          id: user.id,
        },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
            },
          });
        }
      );
    });
  });
});

module.exports = router;
