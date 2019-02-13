const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json("Access denied. No token provided");

  try {
    const decode = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decode;
    next();
  }
  catch(err) {
    res.status(403).json("Invalid token")
  }
}