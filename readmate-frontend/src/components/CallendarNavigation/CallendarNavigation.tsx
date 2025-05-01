import NavIcon from "../../assets/svg/nav-arrow-pink.svg?react";
import { formatDate } from "../../lib/utils";

interface CallendarNavigationProps {
  handleDateChange: (direction: number) => void;
  dateRange: [Date, Date];
}

export const CallendarNavigation = ({
  handleDateChange,
  dateRange,
}: CallendarNavigationProps) => {
  const dateStringFrom = formatDate(dateRange[0]);
  const dateStringTo = formatDate(dateRange[1]);

  return (
    <div className="grid grid-cols-[20px_auto_20px] justify-between items-center lg:min-w-[220px] h-[25px] lg:h-[40px] bg-white/90 shadow-[0px_1px_14px_0px_rgba(0,0,0,0.3)] rounded-4xl ">
      <NavIcon
        onClick={() => handleDateChange(-1)}
        className="ml-0 lg:ml-5 h-[20px] w-full lg:h-full cursor-pointer z-1"
      />
      <div className="text-center font-medium text-xs  lg:text-[14px] w-max whitespace-nowrap">
        {dateStringFrom} / {dateStringTo}
      </div>
      <NavIcon
        onClick={() => handleDateChange(1)}
        className={`${
          dateRange[1] > new Date() ? "pointer-events-none opacity-50" : ""
        } mr-0 lg:mr-5 h-[20px] lg:h-full w-full rotate-180 cursor-pointer justify-self-end`}
      />
    </div>
  );
};
