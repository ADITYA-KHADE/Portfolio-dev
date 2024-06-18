import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/Isdarkmode";
import Left_dark from "../../assets/Icon-assets/left-arrow (1).ico";
import Left_light from "../../assets/Icon-assets/left-arrow.ico";
import Right_dark from "../../assets/Icon-assets/square-arrow-right.ico";
import Right_light from "../../assets/Icon-assets/square-arrow-right (1).ico";

const skills = [
  { id: 1, name: "Technology", type: "tech" },
  { id: 2, name: "AI Tools", type: "aitool" },
  { id: 3, name: "Coding platform", type: "coding" },
  { id: 4, name: "Microsoft tools", type: "mstool" },
  { id: 5, name: "Language", type: "language" },
  { id: 6, name: "Cloud Hosting", type: "cloud" },
  { id: 7, name: "Version control system", type: "vcs" },
  { id: 8, name: "Development platform", type: "plat" },
];

const Skills = () => {
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
      const response = await fetch(
        "http://localhost:8000/api/skill/getskills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: skillType }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch skills");
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
  if (windowWidth < 768) {
    gridColsClass = "grid-cols-3"; // Show 3 columns on smaller screens
  } else if (windowWidth >= 768 && windowWidth < 1024) {
    gridColsClass = "grid-cols-4"; // Show 4 columns on medium screens
  }

  return (
    <div
      className={`relative isolate font-poppins overflow-hidden ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900"
      } py-6 lg:py-6 sm:py-32`}
      id="skills"
    >
      <div className="text-center mb-8">
        <ol className="flex justify-center gap-2 text-xs font-medium items-center">
          <li>
            <img
              src={theme === "dark" ? Left_dark : Left_light}
              alt="Previous"
              className="h-10 w-10 cursor-pointer"
              onClick={leftdirection}
            />
          </li>

          <li>
            <h1 className="block px-1 py-1 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900">
              {getPrevSkill().name}
            </h1>
          </li>

          <li className="block px-1 py-1 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
            {skills[current - 1].name}
          </li>

          <li>
            <h1 className="block px-1 py-1 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900">
              {getNextSkill().name}
            </h1>
          </li>

          <li>
            <img
              src={theme === "dark" ? Right_dark : Right_light}
              alt="Next"
              className="h-10 w-10 cursor-pointer"
              onClick={rightdirection}
            />
          </li>
        </ol>
      </div>

      <div className={`grid ${gridColsClass}  gap-2 px-20`}>
        {allSkills.map((skill) => (
          <div
            key={skill._id} // Ensure each item has a unique key
            className={`flex items-center justify-center p-4 border rounded-lg ${
              theme === "dark" ? "bg-gray-900 border-gray-900" : "bg-white border-white"
            } text-gray-800 w-32`}
          >
            <img
              src={
                theme === "dark"
                  ? `http://localhost:8000${skill.image.dark}`
                  : `http://localhost:8000${skill.image.light}`
              }
              alt={skill.name}
              className="h-28 w-28 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;

// /uploads/skills/light_1718649036229.ico
