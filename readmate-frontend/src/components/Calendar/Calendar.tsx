import { useState } from "react";
import { getBooksInWeek } from "../../lib/utils";
import { mockBooks } from "../../lib/constants";
import { CalendarNavigation } from "../CalendarNavigation/CalendarNavigation";
import { Button } from "../Button/Button";

export type Book = {
  id: number;
  title: string;
  startDate: Date;
  endDate?: Date;
  color: string;
  start?: number;
  span?: number;
};

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

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const generateCalendarDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const firstWeekDay = firstDayOfMonth.getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysToAddBefore = firstWeekDay === 0 ? 6 : firstWeekDay - 1;
    const daysToAddAfter =
      (7 - new Date(currentYear, currentMonth + 1, 0).getDay()) % 7;

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    for (
      let i = daysInPrevMonth - daysToAddBefore + 1;
      i <= daysInPrevMonth;
      i++
    ) {
      days.push({
        date: new Date(prevYear, prevMonth, i),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(currentYear, currentMonth, i),
        isCurrentMonth: true,
      });
    }

    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    for (let i = 1; i <= daysToAddAfter; i++) {
      days.push({
        date: new Date(nextYear, nextMonth, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  //jeszcze wziac pod uwage ze book.endDate moze byc null

  const splitIntoWeeks = (days: { date: Date; isCurrentMonth: boolean }[]) => {
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  };

  const handleDateChange = (direction: number) => {
    setCurrentMonth((prev) => {
      const newMonth = prev + direction;
      if (newMonth < 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11; // grudzień
      } else if (newMonth > 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0; // styczeń
      }
      return newMonth;
    });
  };

  const days = generateCalendarDays();
  const weeks = splitIntoWeeks(days);
  const actualDateString =
    new Date(currentYear, currentMonth).toLocaleString("en-us", {
      month: "long",
    }) +
    " " +
    currentYear;

  return (
    <>
      <div className="flex flex-col text-black bg-white/50 lg:backdrop-blur-sm w-full h-full rounded-4xl shadow-[0_0_25px_rgba(0,0,0,0.3)]">
        <div className="flex w-full p-5 h-20 flex-row justify-between items-center lg:px-5">
          <div className="flex  flex-row items-center gap-3 lg:gap-10 ">
            <CalendarNavigation
              handleDateChange={handleDateChange}
              date={new Date(currentYear, currentMonth, 1)}
            />

            <span className="font-extrabold text-sm lg:text-3xl text-[#A449FF]">
              {actualDateString}
            </span>
          </div>

          <Button className="px-1 py-1! ml-1">Shrink</Button>
        </div>
        <div className="flex-1 p-5 lg:p-10 rounded-4xl shadow-[0_0_25px_rgba(0,0,0,0.3)] flex flex-col">
          <div className="flex flex-col border rounded-xl flex-1">
            <div className="grid grid-cols-7">
              {["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"].map((day) => (
                <div key={day} className="text-center font-bold py-2 ">
                  {day}
                </div>
              ))}
            </div>
            {/* <hr /> */}

            {weeks.map((week, weekIdx) => {
              const books = getBooksInWeek(week, mockBooks);
              return (
                <div key={weekIdx} className="relative flex-1">
                  <hr className="relative" />

                  <div className="h-full grid grid-cols-7 overflow-y-hidden  divide-x-1 relative  ">
                    <div className="custom-scroll px-1 max-h-[100%] pt-5 gap-px overflow-y-auto grid grid-cols-14 bg-transparent absolute w-full  text-[8px] md:text-xs">
                      {books.map(
                        (book, idx) =>
                          book && (
                            <div
                              key={idx}
                              className={`${colStartClasses[book.start!]} ${
                                colSpanClasses[book.span!]
                              } ${
                                book.color
                              } rounded text-center text-xs sm:text-sm lg:text-lg rounded-xl px-1 text-nowrap overflow-hidden custom-scroll overflow-x-auto`}
                            >
                              {book?.title}
                            </div>
                          )
                      )}
                    </div>
                    {week.map((day, dayIdx) => (
                      <div
                        key={`day-${dayIdx}`}
                        className={`min-h-10 md:min-h-20 flex-1 flex flex-col ${
                          day.isCurrentMonth ? "" : "text-gray-400"
                        } 
                        
                        ${dayIdx === 6 && !day.isCurrentMonth ? "" : ""}`}
                      >
                        <div className="text-xs p-1">{day.date.getDate()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* <hr /> */}
          </div>
        </div>
      </div>
    </>
  );
};
