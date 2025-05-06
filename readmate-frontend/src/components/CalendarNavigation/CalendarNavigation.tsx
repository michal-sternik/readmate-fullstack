import NavIcon from "../../assets/svg/nav-arrow-pink.svg?react";
import { formatDate } from "../../lib/utils";

interface CalendarNavigationProps {
  handleDateChange: (direction: number) => void;
  dateRange?: [Date, Date];
  date?: Date;
}

export const CalendarNavigation = ({
  handleDateChange,
  dateRange,
  date,
}: CalendarNavigationProps) => {
  let dateStringFrom: string = "";
  let dateStringTo: string | undefined = undefined;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (dateRange) {
    dateStringFrom = formatDate(dateRange[0]);
    dateStringTo = formatDate(dateRange[1]);
  } else if (date) {
    dateStringFrom = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
  }

  const isNextDisabled = dateRange
    ? dateRange[1].getTime() >= today.getTime()
    : date?.getTime() === today.getTime();

  return (
    <div className="grid grid-cols-[20px_auto_20px] justify-between items-center lg:min-w-[220px] h-[25px] lg:h-[40px] bg-white/90 shadow-[0px_1px_14px_0px_rgba(0,0,0,0.3)] rounded-4xl">
      <NavIcon
        onClick={() => handleDateChange(-1)}
        className="ml-0 lg:ml-5 h-[20px] w-full lg:h-full cursor-pointer z-1"
      />

      <div className="text-center font-medium text-xs lg:text-[14px] w-max whitespace-nowrap">
        {dateStringFrom} {dateStringTo ? `/ ${dateStringTo}` : ""}
      </div>

      <NavIcon
        onClick={() => !isNextDisabled && handleDateChange(1)}
        className={`${
          isNextDisabled ? "pointer-events-none opacity-50" : ""
        } mr-0 lg:mr-5 h-[20px] lg:h-full w-full rotate-180 cursor-pointer justify-self-end`}
      />
    </div>
  );
};
