import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Search } from "../Search/Search";
import { DarkmodeButton } from "../DarkmodeButton/DarkmodeButton";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchUserProfile } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

export const RootLayout = () => {
  const typing = false;
  const darkMode = false;

  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.user.loading);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  return (
    <div className="relative min-h-screen">
      <div
        className={`${
          darkMode ? "bg-black" : ""
        } absolute inset-0 -z-10 bg-[url('/src/assets/svg/background.svg')] bg-cover bg-no-repeat bg-top min-h-full"`}
      />

      <div className="flex flex-col lg:flex-row min-h-screen lg:min-h-0 lg:h-screen w-screen gap-5 lg:gap-0 p-5 lg:p-10">
        <Sidebar />

        <div className="h-full w-full flex flex-col flex-1 gap-10 lg:px-10">
          <div className="flex flex-row w-full  ">
            <div className="w-full flex flex-col  gap-5">
              <p className="text-[#A449FF] flex text-xl font-semibold ">
                {typing ? "Exploring:" : "Explore:"}
              </p>
              <div className="flex flex-col w-full lg:flex-row gap-5 items-center">
                <Search />
                <DarkmodeButton />
              </div>
            </div>
          </div>
          <div className="overflow-auto custrom-scroll relative p-5 gap-3 flex flex-col text-black bg-white/50 lg:backdrop-blur-sm w-full h-full rounded-4xl shadow-[0_0_25px_rgba(0,0,0,0.3)]">
            {loading ? (
              <div className="text-[#A449FF] text-[100px] h-full  justify-center flex items-center font-bold">
                <CircularProgress size={100} />
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
