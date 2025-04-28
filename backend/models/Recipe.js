const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  emotionType: String,
  recipeName: String,
  description: String,
  ingredientsDetails: [String],
  instructions: [String],
  url: String,
  imgUrl: String,
  specialIngredient: {
    name: String,
    description: String,
    source: String
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
