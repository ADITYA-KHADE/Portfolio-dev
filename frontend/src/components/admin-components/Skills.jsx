import React from 'react';
import { useTheme } from "../../context/Isdarkmode"; 
import { toast } from "react-hot-toast";

const Skills = () => {
  const [data, setData] = React.useState({
    name: "",
    type: "tech", // Default type
    url: "",
  });

  const [darkImage, setDarkImage] = React.useState(null); // State for the dark theme image file
  const [lightImage, setLightImage] = React.useState(null); // State for the light theme image file
  const [loading, setLoading] = React.useState(false); // State for loading indicator

  // Get the current theme
  const { theme } = useTheme();

  // Input change handler for text fields and select
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value, // Update the relevant field in the state
    });
  };

  // Handler for dark image input changes
  const darkImageHandler = (e) => {
    const file = e.target.files[0];
    setDarkImage(file); // Set the selected file to the dark image state
  };

  // Handler for light image input changes
  const lightImageHandler = (e) => {
    const file = e.target.files[0];
    setLightImage(file); // Set the selected file to the light image state
  };

  // Submit handler for the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    setLoading(true); // Set loading to true while sending the request
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("url", data.url);
      if (darkImage) formData.append("dark", darkImage); // Append the dark image file
      if (lightImage) formData.append("light", lightImage); // Append the light image file

      const response = await fetch("/api/skill/addskill", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add skill");
      }

      const result = await response.json();
      // console.log("Skill added successfully:", result);
      toast.success("Skill added successfully");
      setData({
        name: "",
        type: "tech",
        url: "",
      });
      setDarkImage(null);
      setLightImage(null);
    } catch (error) {
      console.error("Error adding skill:", error);
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  return (
    <div className={`w-full max-w-lg mx-auto mt-8 p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-md rounded-lg`}>
      <h1 className="text-2xl font-bold text-center mb-6">Add Skill</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Skill Name"
          name="name"
          value={data.name}
          onChange={inputHandler}
          className={`p-2 border rounded focus:outline-none font-medium text-xl focus:ring-2 focus:ring-blue-500 ${theme==='light'? "bg-white text-black" : "text-white"} `}
          required
        />
        <input
          type="text"
          placeholder="Skill URL"
          name="url"
          value={data.url}
          onChange={inputHandler}
          className={`p-2 border rounded focus:outline-none font-medium text-xl focus:ring-2 focus:ring-blue-500 ${theme==='light'? "bg-white text-black" : "text-white"} `}
          required
        />
        <label className="font-medium">Skill Type</label>
        <select
          value={data.type}
          onChange={inputHandler}
          name="type"
          className={`p-2 border rounded focus:outline-none font-medium text-xl focus:ring-2 focus:ring-blue-500 ${theme==='light'? "bg-white text-black" : "text-white"} `}
        >
          <option value="tech">Technologies / framework</option>
          <option value="aitool">AI Tools</option>
          <option value="coding">Coding platform</option>
          <option vlaue="mstool">
            Microsoft Tool
          </option>
          <option value="language">
            Language
          </option>
          <option value="cloud">
            Cloud
          </option>
          <option value="vcs">version control system</option>
          <option value="plat">platform</option>
          {/* Add more options as needed */}
        </select>

        {/* Dark theme image input */}
        <label className="font-medium" htmlFor="dark-file-input">
          Dark Theme Image
        </label>
        <input
          onChange={darkImageHandler}
          type="file"
          name="dark"
          id="dark-file-input"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Light theme image input */}
        <label className="font-medium" htmlFor="light-file-input">
          Light Theme Image
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
          {loading ? "Adding..." : "Add Skill"}
        </button>
      </form>
    </div>
  );
};

export default Skills;
