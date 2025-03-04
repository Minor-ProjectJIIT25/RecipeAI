const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    emailId: { type: String, required: true }, // User's email instead of username
    text: { type: String, required: true }, // Comment text
    timestamp: { type: Date, default: Date.now } // Timestamp when comment was added
});

const RecipeSchema = new mongoose.Schema({
    TranslatedRecipeName: String,
    TranslatedIngredients: String,
    TotalTimeInMins: Number,
    Cuisine: String,
    TranslatedInstructions: String,
    URL: String,
    imageUrl: String,
    IngredientCount: Number,
    likes: { type: Number, default: 0 }, // Likes for the recipe
    comments: [CommentSchema] // Array of comments
});

module.exports = mongoose.model("Recipe", RecipeSchema);



