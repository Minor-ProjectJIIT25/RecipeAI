import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD

import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MoodSelector from "./pages/Home/MoodSelector";
import RecipeRecommender from './pages/RecipeRecommender';
=======
import Layout from "./components/Layouts/Layout"; // Import Layout
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; 
import Dashboard from "./pages/Dashboard"; 
import MoodSelector from "./pages/Home/MoodSelector";
import RecipeList from "./components/RecipeList";
>>>>>>> df2df7dcf1ffda7b57381698fb33bc9b25d934cd

const App = () => {
  return (
    <Router>
<<<<<<< HEAD
      <Routes>
        {/* Your existing pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/eat-by-mood" element={<MoodSelector />} />
        <Route path="/recipes" element={<RecipeRecommender />} />
      </Routes>
=======
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/eat-by-mood" element={<MoodSelector />} />
          <Route path="/recipes" element={<RecipeList />} />
        </Routes>
      </Layout>
>>>>>>> df2df7dcf1ffda7b57381698fb33bc9b25d934cd
    </Router>
  );
};

export default App;
