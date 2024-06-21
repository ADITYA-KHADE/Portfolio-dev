import React from "react";
import Cat_boy from "../../../public/assets/Icon-assets/cat-boy.png";
import Phone from "../../../public/assets/Icon-assets/phone.ico";
import Mail from "../../../public/assets/Icon-assets/email.ico";
import Map from "../../../public/assets/Icon-assets/map.ico";
import Linkedin from "../../../public/assets/Icon-assets/linkedin (2).ico";
import Github from "../../../public/assets/Icon-assets/github.ico";
import Twitter from "../../../public/assets/Icon-assets/twitter.ico";
import Instagram from "../../../public/assets/Icon-assets/instagram.ico";
import Whatsapp from "../../../public/assets/Icon-assets/whatsapp.ico";
import Telegram from "../../../public/assets/Icon-assets/telegram.ico";
import Coffee from "../../../public/assets/Icon-assets/coffee.ico";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/Isdarkmode";

const Footer = () => {
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
      className={`relative isolate  font-poppins overflow-hidden ${
        theme === "dark" ? "bg-gray-900" : "bg-blue-900"
      } py-6 lg:py-6 sm:py-32`}
      id="footer"
    >
      <h1 className="text-center text-2xl font-semibold font-bungee-spice transition-transform duration-200 hover:scale-125">
        Aditya's Portfolio
      </h1>
      <div
        className={`mx-auto max-w-7xl flex text-slate-200 ${
          windowWidth < 580 ? "flex-col items-center" : "justify-between"
        }  lg:px-8  px-6 lg:mt-14 `}
      >
        <div className="mx-auto mt-5 max-w-2xl lg:mx-0   relative lg:left-36 lg:gap-8">
          <h1 className="text-center sm:text-left sm:ml-14 sm:font-semibold sm:text-4xl text-2xl py-2 font-medium sm:h-16 sm:w-80">
            Contact info :
          </h1>
          <div className="flex flex-col lg:ml-12 ml-4">
            <p className=" inline-flex gap-3">
              <img src={Phone} alt="" className="w-10 h-10" />
              <span className="relative top-1 hover:text-yellow-400 transition-transform duration-200 hover:scale-110">
                +91 99999 99999
              </span>
            </p>
            <p className="inline-flex gap-3">
              <img src={Mail} alt="" className="w-10 h-10" />
              <span className="relative top-1 hover:text-yellow-400 transition-transform duration-200 hover:scale-110">
                admin@gmail.com
              </span>
            </p>
            <p className="inline-flex gap-3">
              <img src={Map} alt="" className="w-10 h-10 " />
              <span className="relative top-1 hover:text-yellow-400 transition-transform duration-200 hover:scale-110">
                Mumbai,Maharashtra-444111
              </span>
            </p>
            <div className="inline-flex gap-3 mt-5">
              <img
                src={Linkedin}
                alt="LinkedIn"
                className="w-10 h-10 transition-transform duration-200 hover:scale-110"
              />
              <img
                src={Github}
                alt="Github"
                className="w-10 h-10 transition-transform duration-200 hover:scale-110"
              />
              <img
                src={Twitter}
                alt="Twitter"
                className="w-10 h-10 transition-transform duration-200 hover:scale-110"
              />
              <img
                src={Instagram}
                alt="Instagram"
                className="w-10 h-10 transition-transform duration-200 hover:scale-110"
              />
              <img
                src={Whatsapp}
                alt="WhatsApp"
                className="w-10 h-10 transition-transform duration-200 hover:scale-110"
              />
              <img
                src={Telegram}
                alt="Telegram"
                className="w-10 h-10 transition-transform duration-200 hover:scale-110"
              />
            </div>
          </div>
        </div>
        <div className=" max-w-2xl relative lg:right-16 lg:bottom-12 md:right-32">
          {windowWidth > 580 ? (
            <img
              src={Cat_boy}
              alt="avatar-cat-boy"
              className="h-84 w-72 lg:h-96 lg:w-96 lg:mr-16 "
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="divider divider-primary w-1/2"></div>
      </div>
      <div className="flex justify-center gap-2">
        <img src={Coffee} alt="" className="md:w-8 md:h-8 w-6 h-6" />
        <h1 className="text-center font-semibold lg:text-xl">Coffee hai toh code bhi hai.</h1>
      </div>
    </div>
  );
};

export default Footer;
