const bcrypt = require("bcrypt");
const { User, Validate } = require("../models/user");

exports.postUser = (req, res, next) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email})
    .then(user => {
      if (user) return res.status(400).json(`User with the email ${email} already exist`);
      return bcrypt.hash(password, 12)
        .then(hashPassword => {
          const user = new User({
            email: email,
            password: hashPassword
          })
          user.save();
          const token = user.generateToken();
          res.header("x-auth-token", token).json(user);
        })
    })
    .catch(err => {
      console.log(err.message);
    });
}

exports.postLogin = (req, res, next) => {
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user => {
      if (!user) return res.status(404).json("User not found");
      return bcrypt.compare(password, user.password)
        .then(result => {
          if (!result) return res.status(400).json("Invalid email or password");
          const token = user.generateToken();
            res.json(token);
        })
    })
    .catch(err => {
      console.log(err.message);
    });
}