/// <reference types="vite-plugin-svgr/client" />
import Logo from "../../assets/svg/logo.svg?react";
import { Button } from "../Button/Button";
import { NavLink } from "react-router-dom";

const sidebarNavItems = [
  {
    display: "Dashboard",
    to: "/",
  },
  {
    display: "Explore",
    to: "/explore",
  },
  {
    display: "Calendar",
    to: "/calendar",
  },
  {
    display: "User",
    to: "/user",
  },
];

export const Sidebar = () => {
  return (
    <div className="h-full w-full lg:min-w-[250px] lg:max-w-[400px] flex justify-center items-center ">
      <div className="w-full h-full flex gap-5 lg:gap-0 flex-col items-center bg-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-sm rounded-4xl border border-white/20">
        <div className="flex flex-col w-full h-full gap-5 lg:gap-20 items-center">
          <div className="w-full flex justify-center items-center mt-10 p-1">
            <a href="/" className="flex justify-center">
              <Logo className="w-8/10 lg:w-full" />
            </a>
          </div>

          <div className="w-9/10 lg:w-8/10 gap-2 p-2 lg:p-10 lg:gap-10 flex flex-row lg:flex-col overflow-x-auto items-center justify-evenly  bg-white/90 shadow-[0_0_40px_rgba(0,0,0,0.2)] backdrop-blur-md rounded-4xl border border-white/90 ">
            {sidebarNavItems.map((item, index) => (
              <NavLink
                to={item.to}
                key={index}
                className={({ isActive }) =>
                  `justify-center h-10 flex min-w-30  lg:w-full items-center rounded-4xl no-underline transition-colors duration-200 shadow-[0_0_10px_rgba(0,0,0,0.2)] ${
                    isActive
                      ? "bg-purple-500 text-white"
                      : "hover:bg-purple-400 hover:text-white"
                  }`
                }
              >
                {item.display}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="flex flex-row px-5 gap-5 w-full mb-10 justify-center items-center">
          <Button fullWidth>DARKMODE</Button>
          <Button fullWidth>LANGUAGE</Button>
        </div>
      </div>
    </div>
  );
};
