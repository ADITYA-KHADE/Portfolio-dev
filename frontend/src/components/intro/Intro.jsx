import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/Isdarkmode";
import Typewriter from "typewriter-effect";
import "../../tailwind.css";
import handIcon from "../../assets/hand.ico";
import Avatar from "../../assets/avatar2.png"

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
    "A Designer,",
    "An Engineer,",
    "MERN-stack Developer",
    "backend Developer",
    "frontend Developer",
    //   "full-stack Developer",
    //   "React Developer",
    //   "Node Developer",
    //   "Express Developer",
    //   "MongoDB Developer",
    //   "UI/UX Designer",
    //   "Graphic Designer",
    //   "Freelancer",
  ];
  return (
    <div
      className={`hero min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-slate-300"
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
          {/* <p className="py-2 text-3xl font-normal">MERN-stack Developer</p> */}
          {/* <marquee direction="right">
            {texts.map((text, index) => (
              <span
                key={index}
                className={`inline-block px-6 py-2 mx-2 bg-gray-200 rounded-full`}
              >
                {text}
              </span>
            ))}
          </marquee> */}
          {/* <p className={`${windowWidth>1024?"narrow-text":"break-words"}`}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p> */}
          <button className={`btn btn-primary mt-4${
        theme === "dark"
          ? " text-slate-300"
          : " text-gray-900"
      }`} onClick={()=>{window.open("https://drive.google.com/file/d/1ytYxcm4MMw3pKrjie4ZTk3dMNTw2DArc/view?usp=sharing", "_blank");}}>Resume/CV</button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
