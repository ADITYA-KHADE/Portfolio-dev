import React, { useState, useEffect } from "react";
import Contact_man from "/assets/Icon-assets/man-working-on-desk-removebg.png";
import { useTheme } from "../../context/Isdarkmode";
import { toast } from "react-hot-toast";
import E_dark from "/assets/Icon-assets/customer-support.ico";
import E_light from "/assets/Icon-assets/customer-support (2).ico";


const Contact = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { theme } = useTheme();

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    formData.append("access_key", "513352f8-b673-495a-ae84-91787e53888e");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      console.log("Form Submitted", data);
      toast.success("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
    
      className={`isolate ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900"
      } px-6 py-24 sm:py-32 lg:px-8 font-poppins`}
    >
      <h2
        className={`text-3xl font-bold tracking-tight py-4 mt-6 sm:text-4xl md:text-5xl flex justify-center lg:mt-8`}
      >
        <img
          src={theme === "dark" ? E_light : E_dark}
          alt="Education Icon"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" 
          id="Contact"
        />
        &nbsp;Get in Touch
      </h2>
      <div
        className={`flex ${
          windowWidth <= 1024
            ? "flex-col justify-center items-center"
            : "justify-between"
        }`}
      >
        <img
          src={Contact_man}
          alt="photo"
          className="lg:w-1/3 lg:h-2/3 lg:top-20 lg:left-24 relative w-full  md:w-1/2 md:h-1/2 "
        />
        <form
          onSubmit={onSubmit}
          className="py-16 w-full sm:w-2/3 lg:w-1/3 lg:right-60 relative"
        >
          <input
            type="hidden"
            name="access_key"
            value="513352f8-b673-495a-ae84-91787e53888e"
          />
          <div className="p-2">
            <label
              htmlFor="fullname"
              className="block text-xl font-semibold leading-6 p-1"
            >
              Full name
            </label>
            <div>
              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Enter your name"
                autoComplete="given-name"
                className={`block w-full ${
                  theme === "dark"
                    ? "bg-white text-black"
                    : "bg-slate-200 text-gray-900"
                } lg:text-xl rounded-md border-0 px-3.5 py-2 font-medium  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm md:leading-6`}
                required
              />
            </div>
          </div>
          <div className="p-2">
            <label
              htmlFor="email"
              className="block text-xl font-semibold leading-6 p-1"
            >
              Email
            </label>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="example@example.com"
                className={`block w-full ${
                  theme === "dark"
                    ? "bg-white text-black"
                    : "bg-slate-200 text-gray-900"
                } lg:text-xl rounded-md border-0 px-3.5 py-2 font-medium  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm md:leading-6`}
                required
              />
            </div>
          </div>
          <div className="p-2">
            <label
              htmlFor="number"
              className="block text-xl font-semibold leading-6 p-1"
            >
              Phone Number
            </label>
            <div>
              <input
                type="tel"
                name="number"
                id="number"
                autoComplete="tel"
                placeholder="1234567890 (optional)"
                className={`block w-full ${
                  theme === "dark"
                    ? "bg-white text-black"
                    : "bg-slate-200 text-gray-900"
                } lg:text-xl rounded-md border-0 px-3.5 py-2 font-medium  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm md:leading-6`}
                
              />
            </div>
          </div>
          <div className="sm:col-span-2 p-2">
            <label
              htmlFor="message"
              className="block text-xl font-semibold leading-6 p-1"
            >
              Message
            </label>
            <div>
              <textarea
                name="message"
                id="message"
                rows={4}
                placeholder="Your message"
                className={`block w-full ${
                  theme === "dark"
                    ? "bg-white text-black"
                    : "bg-slate-200 text-gray-900"
                }  lg:text-lg rounded-md border-0 font-medium px-3.5 py-2 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6`}
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="block w-full font-semibold text-lg rounded-2xl bg-indigo-600 px-3.5 py-2.5 text-center  text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
