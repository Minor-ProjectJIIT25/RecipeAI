import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <Container>
        <Row className="text-center text-md-start">
          {/* Left Section - Brand & About */}
          <Col md={4} className="mb-3">
            <h4 style={styles.footerLogo}>🍔 Savoury Sense</h4>
            <p>Your go-to place for delicious recipes and foodie inspiration!</p>
          </Col>

          {/* Middle Section - Quick Links */}
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul style={styles.footerLinks}>
              <li><Link to="/" style={styles.link}>Home</Link></li>
              <li><a href="#about" style={styles.link}>About</a></li>
              <li><Link to="/blog" style={styles.link}>Blog</Link></li>
              <li><a href="#contact" style={styles.link}>Contact</a></li>
            </ul>
          </Col>

          {/* Right Section - Social Media */}
          <Col md={4} className="mb-3">
            <h5>Follow Us</h5>
            <div style={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}><FaFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.icon}><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.icon}><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.icon}><FaLinkedin /></a>
            </div>
          </Col>
        </Row>

        {/* Bottom Copyright */}
        <Row className="text-center mt-3">
          <Col>
            <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Savoury Sense. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

// Inline CSS Styles
const styles = {
  footer: {
    background: "#222",
    color: "white",
    padding: "20px 0",
  },
  footerLogo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#ffcc00",
  },
  footerLinks: {
    listStyle: "none",
    padding: 0,
  },
  link: {
    textDecoration: "none",
    color: "#ffcc00",
    transition: "color 0.3s",
    display: "block",
    marginBottom: "8px",
  },
  socialIcons: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  icon: {
    fontSize: "1.5rem",
    color: "#ffcc00",
    transition: "transform 0.3s",
  },
};

export default Footer;