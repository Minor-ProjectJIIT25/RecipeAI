const express = require("express");
const { getAllRecipes, likeRecipe, unlikeRecipe, addComment } = require("../controllers/recipeController");

const router = express.Router();

// Fetch all recipes
router.get("/", getAllRecipes);

// Like and Unlike Recipes
//router.post("/:recipeId/like", likeRecipe);
router.post("/:recipeId/unlike", unlikeRecipe);

// Add a comment to a recipe
router.post("/:recipeId/comment", addComment);

module.exports = router;

