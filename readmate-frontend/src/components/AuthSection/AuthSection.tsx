import { NavLink } from "react-router-dom";

export const AuthSection = () => {
  const currentUser = null;
  return (
    <div className="flex rounded-4xl shadow-[0px_4px_24px_-6px_#000000] h-1/2 flex flex-row text-center align-middle font-medium text-sm justify-center bg-white/90">
      {currentUser ? (
        <div className="flex items-center justify-center w-full">
          {currentUser}
        </div>
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
