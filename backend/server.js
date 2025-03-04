const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
<<<<<<< HEAD
const fs = require("fs");
const csvParser = require("csv-parser");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

=======
const path = require("path"); // ✅ Add this line
const recipeRoutes = require("./routes/recipesRoutes");
const Recipe = require("./models/Recipe");

// 🔹 MongoDB Connection
>>>>>>> c657bd0 (commit)
const MONGO_URI = "mongodb://127.0.0.1:27017/recipeAI";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Serve static images from 'Food Images' folder


app.use("/api", recipeRoutes);

// 🔹 User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const SECRET_KEY = "my_super_secret_key";

// 🔹 Food-Mood Schema
const foodSchema = new mongoose.Schema({
  mood: String,
  foods: [String],
});
const Food = mongoose.model("Food", foodSchema);

// 🔹 Import CSV Data into MongoDB (Fixed)
const importCSV = async () => {
  try {
    const foods = [];
    fs.createReadStream("foods.csv")
      .pipe(csvParser())
      .on("data", (row) => {
        const mood = row.mood.trim();
        const foodItems = Object.values(row)
          .slice(1) // Skip the first column (mood)
          .map(f => f.trim())
          .filter(f => f); // Remove empty values

        foods.push({ mood, foods: foodItems });
      })
      .on("end", async () => {
        await Food.deleteMany({});
        await Food.insertMany(foods);
        console.log("✅ CSV Data Imported Successfully with full food list");
      });
  } catch (error) {
    console.error("❌ CSV Import Error:", error);
  }
};

// Call importCSV() to load data on startup
importCSV();

// 🔹 Signup Route
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;
<<<<<<< HEAD
=======

>>>>>>> c657bd0 (commit)
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

// 🔹 Contact Form Route
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newResponse = { name, email, message, date: new Date().toISOString() };

  fs.readFile("responses.json", "utf8", (err, data) => {
    let responses = [];
    if (!err && data) {
      responses = JSON.parse(data);
    }

    responses.push(newResponse);

    fs.writeFile("responses.json", JSON.stringify(responses, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving response" });
      }
      res.json({ message: "Response saved successfully" });
    });
  });
});

// 🔹 Fetch Foods Based on Mood (Fixed)
app.get("/api/foods", async (req, res) => {
  const { mood } = req.query;
  try {
    const result = await Food.findOne({ mood });

    if (result) {
      res.json({ foods: result.foods }); // ✅ Correct structure
    } else {
      res.json({ foods: [] }); // ✅ Prevent errors
    }
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Check if Foods are Stored Correctly in MongoDB
app.get("/api/debug/foods", async (req, res) => {
  try {
    const allFoods = await Food.find({});
    res.json(allFoods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching foods" });
  }
});

// 🔹 Start Server
const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
