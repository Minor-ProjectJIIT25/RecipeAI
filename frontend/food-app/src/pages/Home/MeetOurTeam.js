import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import profilePic from "./11zon_cropped.png";
import profilePic1 from "./11zon_cropped (1).png";
import profilePic2 from "./11zon_cropped (2).png";

const teamMembers = [
  {
    name: "Vaishnavi",
    role: "Full Stack Developer",
    image: profilePic,
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
  },
  {
    name: "Ariba Khan",
    role: "AI/ML Engineer",
    image: profilePic1,
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
  },
  {
    name: "Divyanshi Gupta",
    role: "AI/ML Engineer",
    image: profilePic,
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
  },
  {
    name: "Divyanshu Gupta",
    role: "Resource Aggregator",
    image: profilePic2,
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
  },
];

const MeetOurTeam = () => {
  return (
    <section style={styles.teamSection}>
      <Container>
        <h2 style={styles.heading}>Meet Our Team</h2>
        <Row className="justify-content-center">
          {teamMembers.map((member, index) => (
            <Col key={index} md={3} sm={6} xs={12} className="mb-4">
              <Card style={styles.card}>
                <Card.Img variant="top" src={member.image} style={styles.image} />
                <Card.Body style={styles.cardBody}>
                  <h5 style={styles.name}>{member.name}</h5>
                  <p style={styles.role}>{member.role}</p>
                  <div style={styles.socialIcons}>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={styles.icon}>
                      <FaLinkedin />
                    </a>
                    <a href={member.github} target="_blank" rel="noopener noreferrer" style={styles.icon}>
                      <FaGithub />
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

const styles = {
  teamSection: {
    background: "#222",
    color: "white",
    padding: "50px 0",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#ffcc00",
    marginBottom: "20px",
  },
  card: {
    background: "#333",
    color: "white",
    textAlign: "center",
    padding: "15px",
    borderRadius: "10px",
    transition: "transform 0.3s ease-in-out",
  },
  cardBody: {
    padding: "15px",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "50%",
    margin: "auto",
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginTop: "10px",
  },
  role: {
    fontSize: "1rem",
    color: "#ffcc00",
    marginBottom: "10px",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "10px",
  },
  icon: {
    fontSize: "1.5rem",
    color: "#ffcc00",
    transition: "color 0.3s",
    textDecoration: "none",
  },
};

export default MeetOurTeam;