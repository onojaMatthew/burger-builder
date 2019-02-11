const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  salad: { type: Number },
  cheese: { type: Number },
  meat: { type: Number },
  bacon: { type: Number }
});

const Ingredients = mongoose.model("Ingredients", ingredientSchema);

exports.Ingredients = Ingredients;
