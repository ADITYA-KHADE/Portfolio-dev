import React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/Isdarkmode";
import Github_avatar from "../../../public/assets/Icon-assets/github coding.png";
import user_dark from "../../../public/assets/Icon-assets/user_dark.ico";
import user_light from "../../../public/assets/Icon-assets/user_light.ico";
// const stats = [
//   { name: "Offices worldwide", value: "12" },
//   { name: "Full-time colleagues", value: "300+" },
//   { name: "Hours per week", value: "40" },
//   { name: "Paid time off", value: "Unlimited" },
// ];
const Description = () => {
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

  return (
    <div
      className={`relative isolate font-poppins overflow-hidden ${
        theme === "dark"
          ? "bg-gray-900 text-slate-300"
          : "bg-white text-gray-900"
      } py-20 sm:py-32" id="Description`}
    >
      <h2
        className={`text-3xl font-bold tracking-tight k sm:text-4xl md:text-5xl m flex justify-center ${
          windowWidth <= 1024 ? "mt-14" : ""

        }`}
      >
        <img
          src={`${theme == "dark" ? user_light : user_dark}`}
          alt=""
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        />{" "}
        About me
      </h2>
      <div
        className={`mx-auto max-w-7xl  flex justify-between lg:px-8  px-6 ${
          windowWidth <= 1024 ? "flex-col text-center mt-12 " : "flex-row mt-16"
        }`}
      >
        <div className="mx-auto mt-5 max-w-2xl lg:mx-0">
          <h1 className="mt-3 ml-2 font-bold text-3xl">
            I'm Aditya Khade,
          </h1>
          <p className="mt-1 ml-2 text-base font-medium">MERN Stack Developer</p>
          <p className="mt-6 ml-2 text-lg leading-8 whitespace-normal  ">
            I am a MERN Stack Developer with a passion for creating and
            developing web applications. I have experience in building
            responsive web applications using React, Node.js, Express, and
            MongoDB. I am a quick learner and always eager to learn new
            technologies.
          </p>
        </div>
        <div className="mx-auto mt-4 max-w-2xl lg:mx-0 lg:max-w-none">
          <img src={Github_avatar} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Description;

{
  /* <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-black sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div> */
}
{
  /* <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-700">
                  {stat.name}
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-black">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl> */
}
