const Recipe = require("../models/Recipe");

// Fetch all recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Like a recipe
const likeRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        recipe.likes += 1;
        await recipe.save();

        res.status(200).json({ message: "Recipe liked!", recipe });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Unlike a recipe
const unlikeRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        recipe.likes = Math.max(0, recipe.likes - 1); // Prevent negative likes
        await recipe.save();

        res.status(200).json({ message: "Recipe unliked!", recipe });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Add a comment to a recipe
const addComment = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const { emailId, text } = req.body;

        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Create a new comment object
        const newComment = {
            emailId,
            text,
            timestamp: new Date(),
        };

        // Push the comment to the recipe
        recipe.comments.push(newComment);
        await recipe.save();

        res.status(201).json({ message: "Comment added successfully", recipe });
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error });
    }
};

// Export all functions
module.exports = { getAllRecipes, likeRecipe, unlikeRecipe, addComment };

