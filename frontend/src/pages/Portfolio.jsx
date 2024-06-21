import React from "react";
import Navbar from "../components/navbar/Navbar";
import Intro from "../components/intro/Intro";
import Description from "../components/information/Description";
import Education from "../components/information/Education";
import Projects from "../components/project/Projects";
import Skills from "../components/technology/Skills";
import Achievement from "../components/technology/Achievement";
import Contact from "../components/contact/Contact";
import Footer from "../components/footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
// import { ThemeProvider } from "../context/Isdarkmode";

import "../App.css"
const Portfolio = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Intro />
            <Description />
            <Education />
            <Skills />
            <Projects />
            {/* <Achievement /> */}
            <Contact />
            <Footer />
          </>
        }
      ></Route>
    </Routes>
  );
};

export default Portfolio;
