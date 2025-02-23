const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Replace with your MongoDB Atlas Connection String OR Local MongoDB Compass URL
const MONGO_URI = "mongodb://127.0.0.1:27017/recipeAI";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔹 User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String, // Hashed Password
});

const User = mongoose.model("User", userSchema);

const SECRET_KEY = "my_super_secret_key"; // 🔒 Hardcoded Secret Key (For Development)

// 🔹 Signup Route
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  // Hash password before storing
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

  // Generate JWT token
  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token });
});

// 🔹 Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
