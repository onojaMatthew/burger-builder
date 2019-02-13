const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config();

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String },
  password: { type: String }
});

const User = mongoose.model("User", userSchema);

userSchema.methods.generateToken = function() {
  const token = jwt.sign({ _id: this._id}, process.env.jwtPrivateKey);
  return token;
}

exports.User = User;
