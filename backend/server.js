const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const path = require("path");
const recipeRoutes = require("./routes/recipesRoutes");

// 🔹 MongoDB Connection
const MONGO_URI = "mongodb://127.0.0.1:27017/recipeAI";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔹 User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

const SECRET_KEY = "my_super_secret_key"; 

// 🔹 Signup Route
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User registered successfully" });
});

// 🔹 Login Route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// 🔹 Recipe Schema
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
    source: String,
  },
});
const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

// 🔹 Import JSON Data into MongoDB
const importJSON = async () => {
  try {
    const jsonData = JSON.parse(fs.readFileSync("newdb.json", "utf8"));
    const recipes = jsonData.recipes.map(recipe => ({
      emotionType: recipe.emotionType,
      recipeName: recipe.recipeName,
      description: recipe.description,
      ingredientsDetails: recipe.ingredientsDetails || [],
      instructions: recipe.instructions || [],
      url: recipe.url,
      imgUrl: recipe.imgUrl,
      specialIngredient: recipe.specialIngredient || {},
    }));

    await Recipe.deleteMany({});
    await Recipe.insertMany(recipes);
    console.log("✅ JSON Data Imported Successfully");
  } catch (error) {
    console.error("❌ JSON Import Error:", error);
  }
};
importJSON();

// 🔹 Recipe Route - Fetch Recipes Based on Mood
// 🔹 Recipe Route - Fetch Only 6 Recipes Based on Mood
app.get("/api/recipes", async (req, res) => {
  const { mood } = req.query;

  try {
    const recipes = await Recipe.find({ emotionType: mood.toLowerCase() }).limit(6); // ✅ Limiting to 6 recipes
    res.json({ recipes });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// 🔹 Start Server
const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
