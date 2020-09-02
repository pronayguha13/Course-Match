const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  //check for token
  if (!token)
    res.status(401).json({
      msg: "No token ! authorization",
    });
  try {
    //verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid Token" });
  }
};

module.exports = auth;
