import { Button } from "../Button/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const DarkmodeButton = () => {
  const darkmode = false;
  return (
    <div className="flex lg:relative absolute top-6 right-8 lg:top-0 lg:right-0 rounded-xl lg:h-1/2 flex-row text-center  justify-center">
      <Button className="w-full px-3 flex items-center text-xs h-8 lg:h-auto">
        {darkmode ? <LightModeIcon /> : <DarkModeIcon />}
      </Button>
    </div>
  );
};
