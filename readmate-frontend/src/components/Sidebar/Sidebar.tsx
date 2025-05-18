/// <reference types="vite-plugin-svgr/client" />
import Logo from "../../assets/svg/logo.svg?react";
import { Button } from "../Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import Face2RoundedIcon from "@mui/icons-material/Face2Rounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Gender } from "../../types/usertypes";
import { clearUser } from "../../redux/userSlice";

export const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const sidebarNavItems = [
    {
      display: "Dashboard",
      to: "/",
    },
    {
      display: "Calendar",
      to: "/calendar",
    },
    {
      display: "Explore",
      to: "/explore",
    },

    ...(user
      ? [
          {
            display: "User",
            to: "/profile",
          },
        ]
      : []),
  ];

  return (
    <div className="h-full w-full lg:min-w-[250px] lg:max-w-[400px] flex justify-center items-center ">
      <div className="w-full h-full flex gap-5 lg:gap-0 flex-col items-center bg-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] lg:backdrop-blur-sm rounded-4xl border border-white/20">
        <div className="flex flex-col w-full h-full gap-5 lg:gap-20 items-center">
          <div className="w-full flex justify-center items-center mt-10 p-1">
            <a href="/" className="flex justify-center">
              <Logo className="w-8/10 lg:w-full" />
            </a>
          </div>

          <div className="w-9/10 lg:w-8/10 gap-2 p-2 lg:p-10 lg:gap-10 flex flex-row lg:flex-col overflow-x-auto scrollbar-hide items-center justify-evenly  bg-white/90 shadow-[0_0_40px_rgba(0,0,0,0.2)]  rounded-4xl  ">
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
        {user ? (
          <div className="flex flex-row px-5 gap-5 w-full mb-10 justify-center items-center">
            <div
              className=" rounded-full text-white bg-purple-400 hover:bg-purple-500 w-100 h-10 items-center flex justify-around"
              onClick={() => navigate("/profile")}
            >
              <Avatar sx={{ bgcolor: "white", height: 30, width: 30 }}>
                {user?.gender === Gender.MALE ? (
                  <FaceRoundedIcon className=" text-blue-500" />
                ) : user?.gender === Gender.FEMALE ? (
                  <Face2RoundedIcon className=" text-pink-500" />
                ) : (
                  <AccountCircleRoundedIcon className=" text-yellow-500" />
                )}
              </Avatar>
              <span className="text-lg whitespace-nowrap">
                {user?.username} ({user?.age})
              </span>
              <Tooltip title="Logout">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    localStorage.removeItem("token");
                    dispatch(clearUser());
                    navigate("/login");
                  }}
                  size="small"
                >
                  <ExitToAppRoundedIcon className="text-white" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div className="flex flex-row px-5 gap-5 w-full mb-10 justify-center items-center">
            <Button fullWidth onClick={() => navigate("/login")}>
              LOGIN
            </Button>
            <Button fullWidth onClick={() => navigate("/register")}>
              REGISTER
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
