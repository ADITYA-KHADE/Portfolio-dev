import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "../../context/Isdarkmode";
import { Swiper, SwiperSlide } from "swiper/react";
import E_dark from "/assets/Icon-assets/checkmark.ico";
import E_light from "/assets/Icon-assets/checkmark (2).ico";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./SwiperStyle.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

const Projects = () => {
  const Server_Url = import.meta.env.VITE_API_SERVER;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { theme } = useTheme();
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/project/getprojects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
        console.log(response);
      }

      const data = await response.json();
      setAllProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div
      id="Projects"
      className={`${
        theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-white"
      } flex flex-col py-20 font-poppins`}
    >
      <div>
        <h2
          className={`text-3xl font-bold tracking-tight mt-10 py-4 sm:text-4xl md:text-5xl flex justify-center lg:mt-8`}
        >
          <img
            src={theme === "dark" ? E_light : E_dark}
            alt="Projects Icon"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          &nbsp;Projects
        </h2>
      </div>
      <div>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 0,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {allProjects.map((project) => (
            <SwiperSlide key={project._id}>
              <div className="swiper-slide-content">
                <img
                  src={`${Server_Url}${project.photo}`}
                  alt={project.name}
                  className="project-image"
                />
                <div
                  id="container"
                  className={`
                    ${theme==="dark" ?"bg-gray-900 text-white":"bg-gray-900 text-white"}
                     font-semibold flex flex-col justify-between p-4 h-full`}
                >
                  <h3 className="text-xl mb:1 md:mb-2 text-center">
                    {project.name}
                  </h3>
                  <p className="sm:text-sm text-xs  mb:1 md:mb-2 text-center">
                    {project.description}
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        window.open(project.github, "_blank");
                      }}
                      className={`${
                        theme === "dark"
                          ? "bg-indigo-400 text-black hover:bg-blue-700"
                          : "text-black bg-white hover:bg-slate-300"
                      } font-medium sm:font-bold py-1 px-1 lg:py-2 lg:px-2 border-white border-2 rounded-2xl transition-transform duration-200 hover:scale-110`}
                    >
                      Source code
                    </button>
                    <button
                      onClick={() => {
                        window.open(project.deploy, "_blank");
                      }}
                      className={`${
                        theme === "dark"
                          ? "bg-indigo-400 text-black hover:bg-blue-700"
                          : "text-black bg-white hover:bg-slate-300"
                      } font-medium sm:font-bold py-1 px-1 lg:py-2 lg:px-2 border-white border-2 rounded-2xl transition-transform duration-200 hover:scale-110`}                    >
                      Deploy link
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Projects;
