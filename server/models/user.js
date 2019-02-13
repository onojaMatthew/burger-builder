const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config();

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String },
  password: { type: String }
});

userSchema.methods.generateToken = function() {
  const token = jwt.sign({ _id: this._id}, process.env.jwtPrivateKey);
  return token;
}

function validateUser(user) {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }

  return Joi.validate(user, schema);
}

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.Validate = validateUser;
