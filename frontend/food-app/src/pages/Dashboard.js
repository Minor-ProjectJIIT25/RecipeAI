import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "./Animation - 1740317900925.json"; // Ensure path is correct
import animationData2 from "./Animation - 1740318960242.json"; // Animation for Why Choose Us
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible); // Toggle chatbot visibility
  };

  const sendMessage = async () => {
    try {
      const res = await axios.post("/api/chatbot", { message });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
    }
  };

  const styles = {
    dashboard: {
      backgroundColor: "#121212",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      color: "white",
      paddingBottom: "50px",
    },
    header: {
      width: "100%",
      padding: "20px 40px",
      backgroundColor: "#1f1f1f",
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
      justifyContent: "center",
      width: "80%",
      height: "80vh",
      marginTop: "80px",
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
      fontSize: "3.5rem",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    paragraph: {
      fontSize: "1.2rem",
      color: "#d3d3d3",
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
      padding: "50px",
      borderRadius: "10px",
      color: "white",
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
    floatingButton: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "15px",
      backgroundColor: "#ff004f",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      fontSize: "24px",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s ease, background-color 0.3s ease",
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    chatbotContainer: {
      position: "fixed",
      bottom: "80px",
      right: "20px",
      width: "350px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      padding: "15px",
      zIndex: 10000,
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
    },
    chatbotHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
    },
    chatbotTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#333",
      margin: "0",
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "20px",
      color: "#555",
      cursor: "pointer",
    },
    inputContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
      marginTop: "15px",
    },
    input: {
      flex: "1",
      padding: "10px",
      fontSize: "14px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      outline: "none",
      transition: "border-color 0.2s ease",
    },
    responseContainer: {
      maxHeight: "200px",
      overflowY: "auto",
      marginTop: "10px",
      padding: "10px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      borderLeft: "4px solid #ff004f",
      fontSize: "14px",
      color: "#333",
    },
    response: {
      whiteSpace: "pre-wrap",
      margin: "0",
      lineHeight: "1.5",
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
                to="/eat-by-mood"
                style={styles.navItem}
                onMouseEnter={(e) => (e.target.style.color = styles.navItemHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.navItem.color)}
              >
                Eat by Mood
              </Link>
            </li>
            <li>
            <Link
  to="#"
  style={styles.navItem}
  onClick={() => (window.location.href = "http://localhost:8501")}
  onMouseEnter={(e) => (e.target.style.color = styles.navItemHover.color)}
  onMouseLeave={(e) => (e.target.style.color = styles.navItem.color)}
>
  SnapChef
</Link>
            </li>
            <li>
              <Link
                to="/recipes"
                style={styles.navItem}
                onMouseEnter={(e) => (e.target.style.color = styles.navItemHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.navItem.color)}
              >
                ChefAI
              </Link>
            </li>
            <li>
              
            <Link
  to="#"
  style={styles.navItem}
  onClick={() => (window.location.href = "http://localhost:3001")}
  onMouseEnter={(e) => (e.target.style.color = styles.navItemHover.color)}
  onMouseLeave={(e) => (e.target.style.color = styles.navItem.color)}
>
  Savoury Social
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

      {/* Chatbot Floating Button */}
      <button
        style={styles.floatingButton}
        onClick={toggleChatbot}
        title="Your personal food assistant, here to help you cook!"
      >
        <i class="fas fa-utensils"></i>

      </button>

      {/* Chatbot Modal */}
      {isChatbotVisible && (
        <div style={styles.chatbotContainer}>
          <div style={styles.chatbotHeader}>
            <h2 style={styles.chatbotTitle}>Savoury Sense Assistant</h2>
            <button style={styles.closeButton} onClick={toggleChatbot}>
              &times;
            </button>
          </div>
          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about recipes..."
            />
            <button style={styles.button} onClick={sendMessage}>
              Send
            </button>
          </div>
          {response && (
            <div style={styles.responseContainer}>
              <p style={styles.response}><strong>Response:</strong> {response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;