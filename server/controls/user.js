const bcrypt = require("bcrypt");
const { User } = require("../models/user");

exports.postUser = (req, res, next) => {
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
  const email = req.body.authData.email;
  const password = req.body.authData.password;

  User.findOne({ email: email })
    .then(user => {
      if (!user) return res.status(404).json("User not found");
      return bcrypt.compare(password, user.password)
        .then(result => {
          if (result) {
            const token = user.generateToken();
            res.json(token);
          }
          res.status(400).json("Invalid email or password")
        })
    })
    .catch(err => {
      console.log(err.message);
    });
}