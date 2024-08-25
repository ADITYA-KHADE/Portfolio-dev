import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/Isdarkmode";

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

const All = () => {
  const { theme } = useTheme();
  const [type, setType] = useState("tech");
  const [allSkills, setAllSkills] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const Server_Url = import.meta.env.VITE_API_SERVER;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        console.log(response); // Log the response before throwing an error
        throw new Error("Failed to fetch skills");
      }

      const data = await response.json();
      setAllSkills(data);
      console.log(data);
      
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/project/getprojects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      if (!response.ok) {
        console.log(response); // Log the response before throwing an error
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setAllProjects(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching projects:", error);
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

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex items-start gap-5 p-10">
      <div className="flex flex-col gap-5">
        <h1 className={`text-2xl font-bold text-center ${theme==='dark'? "text-white" : "text-gray-900"} `}>All Skills</h1>
        <div className="flex flex-col items-center">
          <label htmlFor="pet-select" className={`mb-2 ${theme==='dark'? "text-white" : "text-gray-900"}`}>
            Choose a category:
          </label>

          <select
            name="pets"
            id="pet-select"
            className={`w-54 p-2 border rounded ${theme === "dark" ? "text-white bg-gray-700 border-gray-700" : "text-gray-900 bg-white border-gray-300"}`}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {skills.map((skill) => (
              <option key={skill.id} value={skill.type}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>
        <div
          className={`flex justify-center items-center  ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900 "
          }`}
        >
          <div className={`w-full max-w-3xl ${theme === "dark" ? "text-white bg-gray-900 border-gray-600" : "text-gray-900 bg-white border-gray-300"} rounded-lg shadow-md`}>
            <table className="min-w-full border-collapse border">
              <thead>
                <tr>
                  <th className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>Image</th>
                  <th className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>Name</th>
                  <th className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>Type</th>
                  <th className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>Created At</th>
                  <th className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>Updated At</th>
                  <th className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>URL</th>
                </tr>
              </thead>
              <tbody>
                {allSkills.map((skill) => (
                  <tr key={skill._id} className={theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"}>
                    <td className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"} text-center`}>
                      <img
                        src={
                          theme === "dark"
                            ? `${Server_Url}${skill.image.dark}`
                            : `${Server_Url}${skill.image.light}`
                        }
                        alt={skill.name}
                        className="h-16 w-16 object-contain mx-auto cursor-pointer"
                        onClick={()=>{
                          if(theme==='dark'){
                            window.open(`${Server_Url}${skill.image.dark}`)
                          }else{
                            window.open(`${Server_Url}${skill.image.light}`)
                          }
                        }}
                      />
                    </td>
                    <td className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                      {skill.name}
                    </td>
                    <td className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                      {skill.type}
                    </td>
                    <td className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                      {new Date(skill.createdAt).toLocaleDateString()}
                    </td>
                    <td className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                      {new Date(skill.updatedAt).toLocaleDateString()}
                    </td>
                    <td className={`py-2 px-4 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                      <a
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {skill.url}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <div className={`${theme==='light' ? "text-gray-900" : "text-white"}`}>
        <h1 className="text-2xl font-bold text-center ">All Projects</h1>
        <h1 className="text-2xl font-bold text-center ">test url : <a href="http://localhost:3000">click here</a> </h1>
        <h1 className="text-2xl font-bold text-center ">deploy url : <a href="https://adityakhade.onrender.com/">click here</a></h1>
        </div>


        <div className={`w-full max-w-3xl mt-12  shadow-md  ${theme === "dark" ? "bg-gray-900 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}>
          <table className="min-w-full border-collapse  shadow-md border">
            <thead>
              <tr>
              <th className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>Image</th>
                <th className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>Project Name</th>
                <th className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>Description</th>
                <th className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>Technologies</th>
                <th className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>Created At</th>
                <th className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>GitHub</th>
                <th className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>Live Demo</th>
              </tr>
            </thead>
            <tbody>
              {allProjects.map((project) => (
                <tr key={project._id} className={theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"}>
                  <td className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"} text-center`}>
                      <img
                        src={
                          theme === "dark"
                            ? `${Server_Url}${project.photo}`
                            : `${Server_Url}${project.photo}`
                        }
                        alt={project.name}
                        className="h-16 w-16 object-contain mx-auto cursor-pointer"
                        onClick={()=>
                          window.open(`${Server_Url}${project.photo}`)
                        }
                      />
                    </td>
                  <td className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {project.name}
                  </td>
                  <td className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {project.description}
                  </td>
                  <td className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {project.technologies.join(", ")}
                  </td>
                  <td className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </td>
                  <td className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      GitHub
                    </a>
                  </td>
                  <td className={`py-2 px-3 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    <a
                      href={project.deploy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Live Demo
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default All;
