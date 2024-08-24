import React from 'react'
import { useTheme } from "../../context/Isdarkmode"; 
import { toast } from "react-hot-toast";

const Projects = () => {
  const [data, setData] = React.useState({
    name: "",
    description: "",
    github: "",
    deploy: "",
    technologies: [],
  });

  const [lightImage, setLightImage] = React.useState(null); 
  const [loading, setLoading] = React.useState(false); 

  const { theme } = useTheme();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const lightImageHandler = (e) => {
    const file = e.target.files[0];
    setLightImage(file);
  };

  const technologiesHandler = (e) => {
    const { value } = e.target;
    setData({
      ...data,
      technologies: value.split(",").map(tech => tech.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("github", data.github);
      formData.append("deploy", data.deploy);
      formData.append("technologies", JSON.stringify(data.technologies));
      if (lightImage) formData.append("photo", lightImage);
  
      const response = await fetch("/api/project/addproject", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to add project");
      }
  
      toast.success("Project added successfully");
      setData({
        name: "",
        description: "",
        github: "",
        deploy: "",
        technologies: [],
      });
      setLightImage(null);
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error(error.message || "Failed to add project");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={`w-full max-w-lg mx-auto mt-8 p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-md rounded-lg`}>
      <h1 className="text-2xl font-bold text-center mb-6">Add Project</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Project Name"
          name="name"
          value={data.name}
          onChange={inputHandler}
          className={`p-2 border rounded focus:outline-none font-medium text-xl focus:ring-2 focus:ring-blue-500 ${theme==='light'? "bg-white text-black" : "text-white"} `}
          required
        />
        <textarea
          placeholder="Project Description"
          name="description"
          value={data.description}
          onChange={inputHandler}
          className={`p-2 border rounded focus:outline-none font-medium text-xl focus:ring-2 focus:ring-blue-500 ${theme==='light'? "bg-white text-black" : "text-white"} `}
          required
        />
        <input
          type="text"
          placeholder="GitHub URL"
          name="github"
          value={data.github}
          onChange={inputHandler}
          className={`p-2 border rounded focus:outline-none font-medium text-xl focus:ring-2 focus:ring-blue-500 ${theme==='light'? "bg-white text-black" : "text-white"} `}
          required
        />
        <input
          type="text"
          placeholder="Deployed URL"
          name="deploy"
          value={data.deploy}
          onChange={inputHandler}
          className={`p-2 border rounded focus:outline-none font-medium text-xl focus:ring-2 focus:ring-blue-500 ${theme==='light'? "bg-white text-black" : "text-white"} `}
        />
        <input
          type="text"
          placeholder="Technologies (comma separated)"
          name="technologies"
          value={data.technologies.join(", ")}
          onChange={technologiesHandler}
          className={`p-2 border rounded focus:outline-none font-medium text-xl focus:ring-2 focus:ring-blue-500 ${theme==='light'? "bg-white text-black" : "text-white"} `}
          required
        />

        <label className="font-medium" htmlFor="light-file-input">
          Upload Image
        </label>
        <input
          onChange={lightImageHandler}
          type="file"
          name="light"
          id="light-file-input"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className={`mt-4 p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default Projects;
