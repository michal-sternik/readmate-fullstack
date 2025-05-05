import Skeleton from "react-loading-skeleton";
import ProgressBar from "../ProgressBar/ProgressBar";
import { SimpleCalendar } from "../SimpleCalendar/SimpleCalendar";

const Home = () => {
  return (
    <>
      <div className="px-2 font-normal text-[25px]  text-[#A449FF] flex items-center">
        Your activity:
      </div>

      <div className="p-5 gap-3 bg-white/90 shadow-[0px_1px_14px_0px_rgba(0,0,0,0.3)] rounded-4xl flex flex-col justify-evenly  ">
        <ProgressBar
          text="Hours Read:"
          countFrom={0}
          countUntil={100}
          progressBarFill={25}
        />
        <ProgressBar
          text="Books Read:"
          countFrom={0}
          countUntil={50}
          progressBarFill={4}
        />
      </div>

      <div className="font-normal text-[25px]  text-[#A449FF] flex items-center mt-4">
        Track your readings:
      </div>

      <SimpleCalendar />
    </>
  );
};

export default Home;
