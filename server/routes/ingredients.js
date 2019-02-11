const express = require("express");
const { Ingredients } = require("../models/ingredients");
const router = express.Router();

router.post("/ingredients", (req, res, next) => {
  const ingredients = new Ingredients();
  ingredients.salad = req.body.salad;
  ingredients.cheese = req.body.cheese;
  ingredients.meat = req.body.meat;
  ingredients.bacon = req.body.bacon;

  return ingredients.save()
    .then(ingredient => {
      res.json(ingredient);
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.get("/ingredients", (req, res, next) => {
  return Ingredients.find()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.delete("/ingredients/:id", (req, res, next) => {
  return Ingredients.findByIdAndRemove(req.params.id)
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err.message));
});


module.exports = router;
