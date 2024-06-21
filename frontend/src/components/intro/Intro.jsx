import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/Isdarkmode";
import Typewriter from "typewriter-effect";
import "../../tailwind.css";
import handIcon from "/assets/Icon-assets/hand.ico";
import Avatar from "/assets/Icon-assets/avatar2.png";

const Intro = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { theme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const texts = [
    "A Web Developer,",
    // "A Designer,",
    "An Engineer,",
    "MERN-stack Developer",
    "backend Developer",
    "frontend Developer",
    "React Developer",
    "Software Engineer",
  ];
  return (
    <div
      className={`hero min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900"
      }`}
      id="Home"
    >
      <div className="hero-content lg:-mt-24 gap-20 flex-col lg:flex-row-reverse font-poppins">
        <img
          src={Avatar}
          alt="Stock Photography"
          className={`rounded-full shadow-2xl shapebox ${
            windowWidth <= 1024 ? "h-96 w-60" : ""
          }`}
        />
        <div
          className={`px-10 ${
            windowWidth <= 1024 ? "text-center" : "text-left"
          }`}
        >
          <h1
            className={`sm:text-4xl lg:text-5xl ${
              windowWidth <= 500 ? "text-3xl ml-16" : "text-4xl"
            } font-medium`}
          >
            Hello,
            <span className="wave px-4">
              <img
                src={handIcon}
                className={` ${windowWidth <= 1024 ? "size-10" : "size-20"}`}
                alt=""
              />
            </span>
          </h1>
          <h1
            className={` ${
              windowWidth <= 500 ? "text-4xl" : "text-5xl"
            } py-4 sm:text-6xl lg:text-7xl whitespace-nowrap font-medium`}
          >
            I am Aditya,
          </h1>
          <div className="Typewriter__wrapper text-3xl">
            <Typewriter
              options={{
                strings: texts,
                autoStart: true,
                loop: true,
                cursor: "|",
                delay: 70,
                deleteSpeed: 50,
              }}
            />
          </div>
          <span className="typewriter_cursor"></span>
          <button
            className={`btn btn-primary bg-indigo-600 text-base mt-4${
              theme === "dark" ? " text-slate-300" : " text-gray-900"
            } transition-transform duration-200 hover:scale-110`}
            onClick={() => {
              window.open(
                "https://drive.google.com/file/d/1ytYxcm4MMw3pKrjie4ZTk3dMNTw2DArc/view?usp=sharing",
                "_blank"
              );
            }}
          >
            Resume/CV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
