import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Lottie from "lottie-react";
import contactAnimation from "./Animation - 1740406092464.json"; // Ensure correct path
import axios from "axios";
import './ContactStyle.css';

const Section3 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", formData); // ✅ Fixed API endpoint
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" }); // ✅ Reset form
      
      // Hide success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
      
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <section id="contact" className="contact_section bg-dark text-white py-5">
      <Container>
        <Row className="align-items-center">
          {/* Left Side Animation */}
          <Col lg={5} className="mb-5 mb-lg-0">
            <Lottie animationData={contactAnimation} loop={true} className="w-100" />
          </Col>

          {/* Right Side Contact Form */}
          <Col lg={7}>
            <div className="contact_text text-center text-lg-start">
            <h1 style={{ fontSize: "2rem", fontWeight: "bold",textAlign: "left" }} className="text-warning">
  Contact Us
</h1>

              <p>Have questions or feedback? We'd love to hear from you!</p>

              {submitted && (
                <p className="text-success">✅ Message sent successfully!</p>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    required
                  />
                </Form.Group>

                <Button variant="warning" type="submit">
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Section3;
