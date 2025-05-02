const express = require("express");
const Recipe = require("../models/Recipe"); // Import your Recipe model

const router = express.Router();

// 🔹 Fetch Recipes Based on Mood
router.get("/foods", async (req, res) => {
  const { mood } = req.query;
  try {
    const recipes = await Recipe.find({ emotionType: mood.toLowerCase() });
    res.json({ foods: recipes });
  } catch (error) {
    console.error("❌ Error fetching recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Debug Route to Check Data
router.get("/debug/foods", async (req, res) => {
  try {
    const allRecipes = await Recipe.find({});
    res.json(allRecipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
});

module.exports = router;
