import { useEffect, useState } from "react";
import { CalendarNavigation } from "../CalendarNavigation/CalendarNavigation";
import {
  formatDate,
  generateSkeletonBooksForWeek,
  getBooksInWeek,
} from "../../lib/utils";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { BookService } from "../../api/services/bookService";
import { RootState } from "../../redux/store";
import { CallendarBook } from "../../types/booktypes";
import Skeleton from "react-loading-skeleton";

const colStartClasses: Record<number, string> = {
  1: "col-start-1",
  2: "col-start-2",
  3: "col-start-3",
  4: "col-start-4",
  5: "col-start-5",
  6: "col-start-6",
  7: "col-start-7",
  8: "col-start-8",
  9: "col-start-9",
  10: "col-start-10",
  11: "col-start-11",
  12: "col-start-12",
  13: "col-start-13",
  14: "col-start-14",
};

const colSpanClasses: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
  13: "col-span-13",
  14: "col-span-14",
};
const swrConfig = {
  revalidateOnFocus: true,
  revalidateOnReconnect: false,
  dedupingInterval: 60000,
};

export const SimpleCalendar = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const [actualDate, setActualDate] = useState(new Date());
  const [actual7DaysRange, setActual7DaysRange] = useState<
    { date: Date; isCurrentMonth: boolean }[]
  >([]);

  const {
    data: books,
    error,
    isLoading,
  } = useSWR<CallendarBook[] | undefined>(
    user
      ? `/book/calendar?month=${actualDate.getMonth()}&year=${actualDate.getFullYear()}`
      : null,
    BookService.getCalendar,
    swrConfig
  );

  const get7DayRange = (centerDate: Date) => {
    const start = new Date(centerDate);
    start.setDate(centerDate.getDate() - 3);
    const end = new Date(centerDate);
    end.setDate(centerDate.getDate() + 3);

    const range: { date: Date; isCurrentMonth: boolean }[] = [];
    const current = new Date(start);
    while (current <= end) {
      range.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === centerDate.getMonth(), // Porównanie miesiąca
      });
      current.setDate(current.getDate() + 1);
    }
    return range;
  };

  useEffect(() => {
    setActual7DaysRange(get7DayRange(actualDate));
  }, [actualDate]);

  const handleDateChange = (direction: number) => {
    const newDate = new Date(actualDate);
    newDate.setDate(actualDate.getDate() + direction * 7);
    setActualDate(newDate);
  };

  const actualDateString =
    actualDate.toLocaleString("en-us", { month: "long" }) +
    " " +
    actualDate.toLocaleString("default", { year: "numeric" });

  return (
    <div className="grow min-h-[200px] lg:min-h-0 bg-white/90 shadow-[0px_1px_14px_0px_rgba(0,0,0,0.3)] rounded-4xl flex flex-col  p-4">
      <div className="flex w-full flex-row justify-between items-center lg:px-5">
        <div className="flex  flex-row items-center gap-3 lg:gap-10 ">
          {actual7DaysRange.length === 7 && (
            <CalendarNavigation
              handleDateChange={handleDateChange}
              dateRange={[actual7DaysRange[0].date, actual7DaysRange[6].date]}
            />
          )}

          <span className="font-extrabold text-sm lg:text-3xl text-[#A449FF]">
            {actualDateString}
          </span>
        </div>

        <Button
          onClick={() => navigate("calendar")}
          className="px-1 py-1! ml-1"
        >
          Expand
        </Button>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="grid grid-cols-7">
          {actual7DaysRange.map((day, id) => (
            <div
              key={id}
              className="text-center text-xs lg:text-lg text-[#A449FF] py-2"
            >
              {formatDate(day.date)}
            </div>
          ))}
        </div>

        <div className="h-full grid grid-cols-7 border rounded-4xl overflow-y-hidden  divide-x-1 relative  ">
          <div className="custom-scroll px-1 max-h-[100%] p-5 gap-px overflow-y-auto grid grid-cols-14 bg-transparent absolute w-full  text-[8px] md:text-xs">
            {actual7DaysRange.length === 7 &&
              !error &&
              (isLoading
                ? generateSkeletonBooksForWeek()
                : books
                ? getBooksInWeek(actual7DaysRange, books)
                : []
              ).map((book, idx) => {
                const isSkeleton = isLoading || !("color" in book);
                const colStart = colStartClasses[book.start!];
                const colSpan = colSpanClasses[book.span!];
                if (isSkeleton) {
                  return (
                    <div key={idx} className={`${colStart} ${colSpan}`}>
                      <Skeleton className="rounded-xl h-5" />
                    </div>
                  );
                } else {
                  const calendarBook = book as CallendarBook;
                  return (
                    <div
                      key={idx}
                      className={`${colStart} ${colSpan} ${book.color!} rounded-4xl text-sm lg:text-lg text-center text-nowrap custom-scroll overflow-auto`}
                    >
                      {calendarBook.title}
                    </div>
                  );
                }
              })}
          </div>
          {actual7DaysRange.map((day, dayIdx) => (
            <div
              key={`day-${dayIdx}`}
              className={`min-h-30 md:min-h-30 flex-1 flex flex-col ${
                day.isCurrentMonth ? "" : "text-gray-400"
              } 
                        
                        ${dayIdx === 6 && !day.isCurrentMonth ? "" : ""}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
