import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Intro from "../components/intro/Intro";
import Description from "../components/information/Description";
import Education from "../components/information/Education";
import Projects from "../components/project/Projects";
import Skills from "../components/technology/Skills";
// import Achievement from "../components/technology/Achievement";
import Contact from "../components/contact/Contact";
import Footer from "../components/footer/Footer";
import Login from "./admin/Login";
import Home from "./admin/Home";
import { useAuthContext } from "../context/Authcontext";
// import { ThemeProvider } from "../context/Isdarkmode";

import "../App.css";

const Portfolio = () => {
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/auth/getToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: authUser?._id }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (authUser && authUser?._id) {
      fetchData();
    }
  }, [authUser]);

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
      />
      <Route
        path="/admin"
        element={authUser ? <Home /> : <Navigate to="/login" />}
      />
      <Route
          path="/login"
          element={authUser ? <Navigate to="/admin" /> : <Login />}
        />
    </Routes>
  );
};

export default Portfolio;
