import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import Face2RoundedIcon from "@mui/icons-material/Face2Rounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

const exampleUser = {
  id: 1,
  username: "test",
  email: "test@test.com",
  gender: "male",
  createdAt: "2023-10-01T12:00:00Z",
  age: 25,
};

export const AuthSection = () => {
  const { gender } = exampleUser;
  return (
    <div className="flex rounded-4xl  shadow-[0px_4px_24px_-6px_#000000] h-1/2 flex flex-row text-center align-middle font-medium text-sm justify-center bg-white/90">
      {exampleUser ? (
        <button className="px-5 cursor-pointer rounded-4xl gap-3 h-full w-full hover:bg-pink-100 bg-white/90 flex items-center justify-center">
          <Avatar
            sx={{
              bgcolor: "white",
            }}
          >
            {gender === "male" ? (
              <FaceRoundedIcon className=" text-blue-500" />
            ) : gender === "female" ? (
              <Face2RoundedIcon className=" text-pink-500" />
            ) : (
              <AccountCircleRoundedIcon className=" text-yellow-500" />
            )}
          </Avatar>
          <div>Logout</div>
          <ExitToAppRoundedIcon className="text-purple-500" />
        </button>
      ) : (
        <>
          <div className="px-5 rounded-l-4xl h-full w-1/2 bg-white/90 flex items-center justify-center">
            <NavLink to="/log-in" className="no-underline">
              <div>LOG IN</div>
            </NavLink>
          </div>
          <div className="text-nowrap px-5 rounded-r-4xl h-full w-1/2 bg-[#D7D7D7]/90 flex items-center justify-center">
            <NavLink to="/sign-up" className="no-underline">
              <div>SIGN UP</div>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};
