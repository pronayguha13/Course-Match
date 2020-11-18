const router = require("express").Router();

const SearchSchema = require("../models/SearchModel");
const UserSchema = require("../models/User");
const { response } = require("express");
router.post("/", (req, res, next) => {
  const query = Object.values(req.body)[0];
  console.log("query", query);
  const queryType = typeof query;
  if (queryType === "number") {
    UserSchema.findOne({ roll_number: query })
      .then((user) => {
        return user !== null
          ? res.status(200).json({
              user: [
                {
                  name: user.name,
                  roll_number: user.roll_number,
                },
              ],
            })
          : res.status(204).json({ user: [] });
      })
      .catch((err) => {
        res.status(500).json(err.message);
      });
  } else {
    UserSchema.find({ name: query })
      .then((user) => {
        console.log("user", user);
        const userList = user.map((usr) => {
          const student = {
            name: usr.name,
            roll_number: usr.roll_number,
          };
          return student;
        });
        return userList.length
          ? res.status(200).json({
              user: userList,
            })
          : res.status(204).json({ user: [] });
      })
      .catch((err) => res.status(500).json(err.message));
  }
});

module.exports = router;
