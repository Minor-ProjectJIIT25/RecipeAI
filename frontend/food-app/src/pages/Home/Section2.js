import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Lottie from "lottie-react";
import aboutAnimation from "./Animation - 1740404532746.json"; // Replace with the correct path

const Section2 = () => {
  return (
    <section
      id="about"
      className="about_section bg-dark text-white py-5"
      style={{ scrollMarginTop: "100px", overflow: "hidden" }}
    >
      <Container>
        <Row className="align-items-center">
          <Col lg={5} className="mb-5 mb-lg-0">
            <div className="position-relative">
              <Lottie animationData={aboutAnimation} loop={true} className="w-100" />
            </div>
          </Col>
          <Col lg={7}>
            <div className="about_text text-center text-lg-start">
              <h1 style={{ fontSize: "2rem", fontWeight: "bold",textAlign: "left" }}>About Us</h1>
              <h2 className="text-warning" style={{ fontSize: "2rem" }}>
                Bringing Recipes to Your Fingertips
              </h2>
              <p className="pt-2 pb-4">
                Welcome to <strong>Savoury Sense</strong> – your personal cooking companion!  
                We believe that great meals start with creativity, simplicity, and a pinch of love. Whether you're a beginner or a pro in the kitchen, we provide AI-powered recipe suggestions to make cooking effortless and enjoyable.
              </p>
              
              <h3 className="text-warning" style={{ fontSize: "2rem" }}>
                Why Choose Us?
              </h3>
              <ul className="pt-2 pb-4">
                <li>🍽 AI-Generated Recipes – Enter what you have, and we'll suggest the perfect dish.</li>
                <li>🌍 Diverse Cuisines – Explore flavors from around the world.</li>
                <li>🕒 Quick & Easy Meals – Perfect for your busy schedule.</li>
                <li>🥗 Healthy Choices – Balanced meals for a better lifestyle.</li>
                <li>👨‍🍳 Step-by-Step Guidance – Cooking made simple with detailed instructions.</li>
              </ul>

              <h3 className="text-warning" style={{ fontSize: "2rem" }}>
                Our Vision
              </h3>
              <p className="pb-4">
                Food is more than just fuel—it’s an experience. Our goal is to inspire home cooks, reduce food waste, and make cooking more accessible with AI-powered innovation. No more endless scrolling for recipes—just input your ingredients and get delicious, customized meal ideas instantly.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Section2;
