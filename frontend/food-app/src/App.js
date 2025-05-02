import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MoodSelector from "./pages/Home/MoodSelector";
import RecipeRecommender from './pages/RecipeRecommender';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Your existing pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/eat-by-mood" element={<MoodSelector />} />
        <Route path="/recipes" element={<RecipeRecommender />} />
      </Routes>
    </Router>
  );
};

export default App;
