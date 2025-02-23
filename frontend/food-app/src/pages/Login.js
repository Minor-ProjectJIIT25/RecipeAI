import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); // ✅ Redirect to Dashboard without alert
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: "'Arial', sans-serif",
      background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#333",
    },
    loginContainer: {
      background: "rgba(255, 255, 255, 0.9)",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
      animation: "fadeIn 0.5s ease-in-out",
    },
    heading: {
      marginBottom: "1.5rem",
      fontSize: "2rem",
      color: "#6a11cb",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    input: {
      padding: "0.75rem",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.3s ease",
    },
    inputFocus: {
      borderColor: "#6a11cb",
    },
    button: {
      padding: "0.75rem",
      background: "#6a11cb",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    buttonHover: {
      background: "#2575fc",
    },
    linkText: {
      marginTop: "1rem",
      fontSize: "0.9rem",
    },
    link: {
      color: "#6a11cb",
      textDecoration: "none",
      transition: "color 0.3s ease",
    },
    linkHover: {
      color: "#2575fc",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.loginContainer}>
        <h2 style={styles.heading}>LOGIN</h2>
        <form onSubmit={handleLogin} style={styles.form}>
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
            Login
          </button>
        </form>
        <p style={styles.linkText}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
