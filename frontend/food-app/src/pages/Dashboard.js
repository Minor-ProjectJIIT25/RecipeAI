import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "./Animation - 1740317900925.json"; // Ensure path is correct
import animationData2 from "./Animation - 1740318960242.json"; // Animation for Why Choose Us
import animationData3 from "./Animation - 1741619950808.json";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const scrollToMoodFood = () => {
    const moodFoodSection = document.getElementById("mood-food-section");
    if (moodFoodSection) {
      moodFoodSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const styles = {
    dashboard: {
      backgroundColor: "#121212", // Dark background for the entire page
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      color: "white",
      position: "relative",
      paddingBottom: "50px",
      fontFamily: "'Poppins', sans-serif", // Modern font
    },
    header: {
      width: "100%",
      padding: "20px 40px",
      backgroundColor: "rgba(31, 31, 31, 0.8)", // Slightly lighter dark for header with transparency
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
      backdropFilter: "blur(10px)", // Glassmorphism effect
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
    },
    logo: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "white",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Text shadow for depth
    },
    navLinks: {
      listStyle: "none",
      display: "flex",
      gap: "10px", // Reduced gap between navigation items
      margin: 0,
      padding: "10px",
    },
    navItem: {
      color: "white",
      textDecoration: "none",
      fontSize: "1.2rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "color 0.3s ease, transform 0.3s ease",
    },
    navItemHover: {
      color: "#ffcc00",
      transform: "translateY(-2px)", // Slight lift on hover
    },
    contentContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
      height: "80vh",
      marginTop: "100px", // Adjusted for fixed header
      gap: "40px", // Space between text and animation
    },
    textSection: {
      flex: 1,
      
    },
    animationContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
    },
    heading: {
      fontSize: "4rem",
      fontWeight: "bold",
      textTransform: "uppercase",
      background: "linear-gradient(45deg, #ffcc00, #ff6699)", // Gradient text
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "10px", // Reduced margin to align with paragraph
    },
    paragraph: {
      fontSize: "1.2rem",
      color: "#d3d3d3", // Light gray for readability
      lineHeight: "1.6",
      marginBottom: "30px",
    },
    button: {
      backgroundColor: "#ffcc00",
      color: "black",
      fontSize: "1.2rem",
      fontWeight: "bold",
      padding: "15px 30px",
      border: "none",
      cursor: "pointer",
      transition: "0.3s ease",
      marginTop: "20px",
      borderRadius: "5px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Shadow for depth
    },
    buttonHover: {
      backgroundColor: "#e6b800",
      transform: "translateY(-2px)", // Slight lift on hover
      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.3)", // Enhanced shadow on hover
    },
    lottieStyle: {
      width: 400,
      height: 400,
      filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))", // Shadow for animation
    },
    secondSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "80%",
      margin: "50px auto",
      padding: "50px",
      borderRadius: "10px",
      color: "white",
      backgroundColor: "rgba(31, 31, 31, 0.8)", // Slightly lighter dark with transparency
      backdropFilter: "blur(10px)", // Glassmorphism effect
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
    },
    bulletPoints: {
      fontSize: "1.2rem",
      lineHeight: "1.8",
      listStyle: "none",
      padding: 0,
    },
    bulletItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "15px",
    },
    moodFoodSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "80%",
      margin: "50px auto",
      padding: "50px",
      borderRadius: "10px",
      color: "white",
      backgroundColor: "rgba(31, 31, 31, 0.8)", // Slightly lighter dark with transparency
      backdropFilter: "blur(10px)", // Glassmorphism effect
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
    },
    moodFoodText: {
      flex: 1,
      textAlign: "left",
    },
    moodFoodButton: {
      backgroundColor: "#ffcc00",
      color: "black",
      fontSize: "1.2rem",
      fontWeight: "bold",
      padding: "15px 30px",
      border: "none",
      cursor: "pointer",
      transition: "0.3s ease",
      marginTop: "20px",
      borderRadius: "5px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Shadow for depth
    },
    moodFoodButtonHover: {
      backgroundColor: "#e6b800",
      transform: "translateY(-2px)", // Slight lift on hover
      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.3)", // Enhanced shadow on hover
    },
  };

  return (
    <div style={styles.dashboard}>
      {/* Header Section */}
      <header style={styles.header}>
        <div style={styles.logo}>🍔 Savoury Sense</div>
        <nav>
          <ul style={styles.navLinks}>
            <li>
              <Link
                to="/"
                style={styles.navItem}
                onMouseEnter={(e) => (e.target.style.color = styles.navItemHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.navItem.color)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/recipes"
                style={styles.navItem}
                onMouseEnter={(e) => (e.target.style.color = styles.navItemHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.navItem.color)}
              >
                Chef Ai
              </Link>
              </li>
              <li>
              <Link
                to="/recipes"
                style={styles.navItem}
                onMouseEnter={(e) => (e.target.style.color = styles.navItemHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.navItem.color)}
              >
                Snap AI
              </Link>
              </li>
              <li>
              <Link
                to="#"
                style={styles.navItem}
                onClick={scrollToMoodFood}
                onMouseEnter={(e) => (e.target.style.color = styles.navItemHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.navItem.color)}
              >
                Eat by Mood
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* First Section - Welcome Back */}
      <div style={styles.contentContainer}>
        {/* Left Side - Text */}
        <div style={styles.textSection}>
          <h1 style={styles.heading}>WELCOME BACK</h1>
          <p style={styles.paragraph}>
            Enjoy AI-powered recipe recommendations based on what you have!
          </p>
          <button
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>

        {/* Right Side - Animation */}
        <div style={styles.animationContainer}>
          <Lottie animationData={animationData} style={styles.lottieStyle} />
        </div>
      </div>

      {/* Second Section - Why Choose Us */}
      <div style={styles.secondSection}>
        {/* Left Side - Animation */}
        <div style={styles.animationContainer}>
          <Lottie animationData={animationData2} style={styles.lottieStyle} />
        </div>

        {/* Right Side - Bullet Points */}
        <div style={{ ...styles.textSection, textAlign: "left", alignItems: "flex-start" }}>
  <h2 style={styles.heading}>Why Choose Us?</h2>
  <ul style={styles.bulletPoints}>
    <li style={styles.bulletItem}>✅ Personalized AI-driven recipes</li>
    <li style={styles.bulletItem}>✅ Quick and easy meal planning</li>
    <li style={styles.bulletItem}>✅ Saves time by suggesting ingredients you already have</li>
    <li style={styles.bulletItem}>✅ Nutrition-focused recommendations</li>
    <li style={styles.bulletItem}>✅ Continuous learning from your preferences</li>
  </ul>
</div>

      </div>

      {/* Mood Food Section */}
      <div id="mood-food-section" style={styles.moodFoodSection}>
        <div style={styles.moodFoodText}>
          <h2 style={styles.heading}>Mood Food</h2>
          <p style={styles.paragraph}>Discover delicious recipes that match your current mood and vibe!</p>
          <button
            style={styles.moodFoodButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.moodFoodButtonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.moodFoodButton.backgroundColor)}
            onClick={() => navigate("/eat-by-mood")}
          >
            Explore Now
          </button>
        </div>

        <div style={styles.animationContainer}>
          <Lottie animationData={animationData3} style={styles.lottieStyle} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;