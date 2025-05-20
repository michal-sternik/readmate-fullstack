import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import ProgressBar from "../ProgressBar/ProgressBar";
import { SimpleCalendar } from "../SimpleCalendar/SimpleCalendar";
import { useEffect, useState } from "react";
import {
  BOOKS_READ_COUNT_FROM,
  BOOKS_READ_COUNT_UNTIL,
  HOURS_READ_COUNT_FROM,
  HOURS_READ_COUNT_UNTIL,
} from "../../lib/constants";
import { convertAndDisplayError } from "../../lib/utils";
import { BookService } from "../../api/services/bookService";

const Home = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const [hoursRead, setHoursRead] = useState(0);
  const [numberOfBooksRead, setNumberOfBooksRead] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (!user) {
      //niezalogowani
      intervalId = setInterval(() => {
        const randomHours = Math.floor(Math.random() * HOURS_READ_COUNT_UNTIL);
        const randomBooks = Math.floor(Math.random() * BOOKS_READ_COUNT_UNTIL);
        setHoursRead(randomHours);
        setNumberOfBooksRead(randomBooks);
      }, 2000);
    } else {
      //zalogowani

      const fetchUserStats = async () => {
        try {
          const response = await BookService.getStatisticsForYear(
            new Date().getFullYear()
          );
          console.log(response);
          setHoursRead(response.hoursRead);
          setNumberOfBooksRead(response.numberOfBooksRead);
        } catch (error) {
          convertAndDisplayError(error);
          console.error("Error loading statistics");
        }
      };

      fetchUserStats();
    }

    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <>
      {/* not logged in overlay */}
      {user && (
        <div className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center   rounded-4xl">
          <button
            onClick={() => navigate("/login")}
            className=" cursor-pointer bg-[#A449FF] text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:bg-[#8d36d9] transition-all duration-200"
          >
            Log in to access
          </button>
        </div>
      )}
      <div
        className={`relative  flex-col flex h-full w-full ${user && "blur-xs"}`}
      >
        <div className="px-2 font-normal text-[25px]  text-[#A449FF] flex items-center">
          Your activity ({`${new Date().getFullYear()}`}):
        </div>

        <div className="p-5 gap-3 bg-white/90 shadow-[0px_1px_14px_0px_rgba(0,0,0,0.3)] rounded-4xl flex flex-col justify-evenly  ">
          <ProgressBar
            text="Hours Read:"
            countFrom={HOURS_READ_COUNT_FROM}
            countUntil={HOURS_READ_COUNT_UNTIL}
            progressBarFill={hoursRead}
          />
          <ProgressBar
            text="Books Read:"
            countFrom={BOOKS_READ_COUNT_FROM}
            countUntil={BOOKS_READ_COUNT_UNTIL}
            progressBarFill={numberOfBooksRead}
          />
        </div>

        <div className="font-normal text-[25px]  text-[#A449FF] flex items-center mt-4">
          Track your readings:
        </div>

        <SimpleCalendar />
      </div>
    </>
  );
};

export default Home;
