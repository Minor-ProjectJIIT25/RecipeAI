import React from "react";
import Layout from "../../components/Layouts/Layout";
import "../../styles/HomeStyle.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Footer from "./Footer";
import MeetOurTeam from "./MeetOurTeam";

const Home = () => {
  return (
    <Layout>
      <Section1 />
      <Section2 />
      <MeetOurTeam />
      <Section3 />
      <Footer />
    </Layout>
  );
};

export default Home;
