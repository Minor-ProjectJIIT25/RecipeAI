import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5001/api/auth/signup", {
        email,
        password,
      });

      navigate("/login"); // ✅ Redirect to login page without alert
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: "'Arial', sans-serif",
      background: "linear-gradient(135deg, #ff7e5f, #feb47b)", // Warm gradient
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#333",
    },
    signupContainer: {
      background: "rgba(255, 255, 255, 0.95)",
      padding: "2.5rem",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
      animation: "slideIn 0.6s ease-in-out",
    },
    heading: {
      marginBottom: "1.5rem",
      fontSize: "2.2rem",
      color: "#ff7e5f", // Warm accent color
      fontWeight: "bold",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.2rem",
    },
    input: {
      padding: "0.8rem",
      border: "2px solid #ddd",
      borderRadius: "8px",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    },
    inputFocus: {
      borderColor: "#ff7e5f",
      boxShadow: "0 0 8px rgba(255, 126, 95, 0.5)",
    },
    button: {
      padding: "0.8rem",
      background: "#ff7e5f", // Warm button color
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background 0.3s ease, transform 0.2s ease",
    },
    buttonHover: {
      background: "#feb47b",
      transform: "scale(1.05)",
    },
    linkText: {
      marginTop: "1.5rem",
      fontSize: "0.95rem",
      color: "#555",
    },
    link: {
      color: "#ff7e5f",
      textDecoration: "none",
      fontWeight: "600",
      transition: "color 0.3s ease",
    },
    linkHover: {
      color: "#feb47b",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.signupContainer}>
        <h2 style={styles.heading}>CREATE ACCOUNT</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <br />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <br />
          <button type="submit" style={styles.button}>
            Signup
          </button>
        </form>
        <p style={styles.linkText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
