import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/Isdarkmode";
import Left_dark from "/assets/Icon-assets/left-arrow (1).ico";
import Left_light from "/assets/Icon-assets/left-arrow.ico";
import Right_dark from "/assets/Icon-assets/square-arrow-right.ico";
import Right_light from "/assets/Icon-assets/square-arrow-right (1).ico";
import E_dark from "/assets/Icon-assets/web-development.ico";
import E_light from "/assets/Icon-assets/web-development (2).ico";

const skills = [
  { id: 1, name: "Technology", type: "tech" },
  { id: 2, name: "AI Tools", type: "aitool" },
  { id: 3, name: "Coding platforms", type: "coding" },
  { id: 4, name: "Microsoft tools", type: "mstool" },
  { id: 5, name: "Language", type: "language" },
  { id: 6, name: "Cloud Hosting", type: "cloud" },
  { id: 7, name: "Version control", type: "vcs" },
  { id: 8, name: "Dev platform", type: "plat" },
];

const Skills = () => {
  const Server_Url = import.meta.env.VITE_API_SERVER;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [type, setType] = useState("tech");
  const [current, setCurrent] = useState(1);
  const { theme } = useTheme();
  const [allSkills, setAllSkills] = useState([]);

  const updatePagination = (newCurrent) => {
    setCurrent(newCurrent);
    const newType = skills[newCurrent - 1].type;
    setType(newType);
  };

  const fetchSkills = async (skillType) => {
    try {
      const response = await fetch("/api/skill/getskills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: skillType }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch skills");
        console.log(response);
      }

      const data = await response.json();
      // console.log(data);
      setAllSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills(type);
  }, [type]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const leftdirection = () => {
    const newCurrent = current === 1 ? skills.length : current - 1;
    updatePagination(newCurrent);
  };

  const rightdirection = () => {
    const newCurrent = current === skills.length ? 1 : current + 1;
    updatePagination(newCurrent);
  };

  const getPrevSkill = () => {
    return current === 1 ? skills[skills.length - 1] : skills[current - 2];
  };

  const getNextSkill = () => {
    return current === skills.length ? skills[0] : skills[current];
  };

  let gridColsClass = "grid-cols-6";
  let image_height = "h-28";
  let image_width = "w-28";
  let image_div_width = "w-32";
  if (windowWidth < 768) {
    gridColsClass = "grid-cols-3"; // Show 3 columns on smaller screens
  } else if (windowWidth >= 768 && windowWidth < 1024) {
    gridColsClass = "grid-cols-4"; // Show 4 columns on medium screens
  }

  if (windowWidth >= 450 && windowWidth < 490) {
    image_height = "h-20";
    image_width = "w-20";
  } else if (windowWidth < 450) {
    image_height = "h-16";
    image_width = "w-16";
  }

  if (windowWidth >= 490 && windowWidth < 530) {
    image_div_width = "w-24";
  } else if (windowWidth >= 450 && windowWidth < 490) {
    image_div_width = "w-20";
  } else if (windowWidth < 450) {
    image_div_width = "w-16";
  }

  return (
    <div
      className={`relative isolate font-poppins overflow-hidden ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } py-6 lg:py-6 sm:py-32`}
      id="Skills"
    >
      <div className=" mb-20 ">
        <h2
          className={`text-3xl font-bold tracking-tight mt-10 sm:text-4xl md:text-5xl flex justify-center lg:mt-8`}
        >
          <img
            src={theme === "dark" ? E_light : E_dark}
            alt="Education Icon"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          &nbsp;Skills and Abilites
        </h2>
      </div>
      <div className="text-center mb-8">
        <ol className="flex justify-center  gap-2 sm:gap-2 md:gap-3 px-2 items-center">
          <li>
            <img
              src={theme === "dark" ? Left_dark : Left_light}
              alt="Previous"
              className="h-12 w-12 cursor-pointer"
              onClick={leftdirection}
            />
          </li>

          {windowWidth > 573 ? (
            <li>
              <h1
                onClick={leftdirection}
                className="block px-2 py-1 font-medium text-xs sm:text-sm md:text-lg rounded-3xl border border-gray-300 bg-white text-center leading-8 text-gray-900 cursor-pointer"
              >
                {getPrevSkill().name}
              </h1>
            </li>
          ) : (
            <></>
          )}

          <li className="block px-2 py-1 rounded-3xl border-blue-300 font-medium text-lg bg-blue-300 text-center leading-8 text-gray-900 cursor-pointer">
            {skills[current - 1].name}
          </li>

          {windowWidth > 573 ? (
            <li>
              <h1
                onClick={rightdirection}
                className="block px-2 py-1 font-medium text-lg rounded-3xl border border-gray-300 bg-white text-center leading-8 text-gray-900 cursor-pointer"
              >
                {getNextSkill().name}
              </h1>
            </li>
          ) : (
            <></>
          )}

          <li>
            <img
              src={theme === "dark" ? Right_dark : Right_light}
              alt="Next"
              className="h-12 w-12 cursor-pointer"
              onClick={rightdirection}
            />
          </li>
        </ol>
      </div>

      <div className={`grid ${gridColsClass}  gap-3 px-20`}>
        {allSkills.map((skill) => (
          <div
            key={skill._id} // Ensure each item has a unique key
            className={`flex flex-col items-center justify-center p-1 border rounded-2xl shadow-2xl transition-transform duration-200 hover:scale-110 ${
              theme === "dark"
                ? "bg-gray-900 border-slate-300"
                : "bg-white border-gray-500"
            } text-gray-800 ${image_div_width}`}
          >
            <img
              src={
                theme === "dark"
                  ? `${Server_Url}${skill.image.dark}` // reminder : change this to your own IP address or localhost:8000
                  : `${Server_Url}${skill.image.light}`
              }
              alt={skill.name}
              className={`${image_height} ${image_width} object-contain `}
            />
            {windowWidth > 450 ? (
              <h1
                className={`${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {skill.name}
              </h1>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;

// /uploads/skills/light_1718649036229.ico
