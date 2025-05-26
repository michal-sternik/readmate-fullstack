import { useState } from "react";
import { Button } from "../Button/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const DarkmodeButton = () => {
  const [showInfo, setShowInfo] = useState(false);
  const darkmode = false;

  const handleClick = () => {
    setShowInfo(true);
    setTimeout(() => setShowInfo(false), 1500);
  };

  return (
    <div className="flex lg:relative absolute top-6 right-8 lg:top-0 lg:right-0 rounded-xl lg:h-1/2 flex-row text-center justify-center">
      {showInfo && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded shadow z-10">
          Coming soon
        </div>
      )}
      <Button
        className="w-full px-3 flex items-center text-xs h-8 lg:h-auto"
        onClick={handleClick}
      >
        {darkmode ? <LightModeIcon /> : <DarkModeIcon />}
      </Button>
    </div>
  );
};
