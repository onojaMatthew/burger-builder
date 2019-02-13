const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const orderRoute = require("./routes/order");
const ingredientRoute = require("./routes/ingredients");

const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.dbUrl, { useNewUrlParser: true })
  .then((open) => console.log("Connect to database!"))
  .catch((err) => console.log(err.message));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send("Hi, Welcome to Express API");
});

// app.post("/api/order", (req, res, next) => {
//   console.log(req.body)
// });

// Other routes will go here
app.use("/api", orderRoute);
app.use("/api", ingredientRoute);

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  }

  console.log(`Server is up on port ${port}`);
});