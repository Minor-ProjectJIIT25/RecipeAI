import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "./Animation - 1740317900925.json"; // Ensure this path is correct
import animationData2 from "./Animation - 1740318960242.json"; // Another animation for Why Choose Us
import backgroundImg from "./OIP.jpeg"; // Ensure this is correct

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const styles = {
    dashboard: {
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      color: "white",
      position: "relative",
      paddingBottom: "50px",
    },
    header: {
      width: "100%",
      padding: "20px 40px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "white",
    },
    navLinks: {
      listStyle: "none",
      display: "flex",
      gap: "20px",
      margin: 0,
      padding: 0,
    },
    navItem: {
      color: "white",
      textDecoration: "none",
      fontSize: "1.2rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "color 0.3s ease",
    },
    navItemHover: {
      color: "#ffcc00",
    },
    contentContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center", // Centers content vertically
      width: "80%",
      height: "80vh", // Makes sure content is centered within the screen
      marginTop: "50px", // Creates space below the navbar
    },
    textSection: {
      flex: 1,
      textAlign: "left",
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
    },
    paragraph: {
      fontSize: "1.2rem",
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
    },
    buttonHover: {
      backgroundColor: "#e6b800",
    },
    lottieStyle: {
      width: 400,
      height: 400,
    },
    secondSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "80%",
      margin: "50px auto",
      paddingTop: "50px",
      borderTop: "2px solid white",
    },
    bulletPoints: {
      fontSize: "1.2rem",
      lineHeight: "1.8",
    },
    bulletItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  };

  return (
    <div>
      {/* Dashboard Section */}
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
                  to="/about"
                  style={styles.navItem}
                  onMouseEnter={(e) => (e.target.style.color = styles.navItemHover.color)}
                  onMouseLeave={(e) => (e.target.style.color = styles.navItem.color)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  style={styles.navItem}
                  onMouseEnter={(e) => (e.target.style.color = styles.navItemHover.color)}
                  onMouseLeave={(e) => (e.target.style.color = styles.navItem.color)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={styles.navItem}
                  onMouseEnter={(e) => (e.target.style.color = styles.navItemHover.color)}
                  onMouseLeave={(e) => (e.target.style.color = styles.navItem.color)}
                >
                  Contact
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
      </div>

      {/* Second Section - Why Choose Us */}
      <div style={styles.secondSection}>
        {/* Left Side - Animation */}
        <div style={styles.animationContainer}>
          <Lottie animationData={animationData2} style={styles.lottieStyle} />
        </div>

        {/* Right Side - Bullet Points */}
        <div style={styles.textSection}>
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
    </div>
  );
};

export default Dashboard;
