import { useEffect, useState } from "react";
import { CallendarNavigation } from "../CallendarNavigation/CallendarNavigation";
import { formatDate, getBooksInWeek } from "../../lib/utils";
import { Book } from "../../types/booktypes";
import { Button } from "../Button/Button";

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

const mockBooks: Book[] = [
  {
    id: 1,
    title: "Wiosenne przebudzenie",
    startDate: new Date(2025, 3, 28),
    endDate: new Date(2025, 3, 30),
  },
  {
    id: 2,
    title: "Tajemnice Marca",
    startDate: new Date(2025, 3, 25),
    endDate: new Date(2025, 3, 28),
  },
  {
    id: 3,
    title: "W poszukiwaniu słońca",
    startDate: new Date(2025, 3, 29),
    endDate: new Date(2025, 4, 2),
  },
  {
    id: 3,
    title: "W poszukiwaniu słońca",
    startDate: new Date(2025, 3, 29),
    endDate: new Date(2025, 4, 2),
  },
  {
    id: 3,
    title: "W poszukiwaniu słońca",
    startDate: new Date(2025, 3, 29),
    endDate: new Date(2025, 4, 2),
  },
  {
    id: 3,
    title: "W poszukiwaniu słońca",
    startDate: new Date(2025, 3, 29),
    endDate: new Date(2025, 4, 2),
  },
  {
    id: 3,
    title: "W poszukiwaniu słońca",
    startDate: new Date(2025, 3, 29),
    endDate: new Date(2025, 4, 2),
  },
  {
    id: 3,
    title: "W poszukiwaniu słońca",
    startDate: new Date(2025, 3, 29),
    endDate: new Date(2025, 4, 2),
  },
  {
    id: 3,
    title: "W poszukiwaniu słońca",
    startDate: new Date(2025, 3, 29),
    endDate: new Date(2025, 4, 2),
  },
  {
    id: 3,
    title: "W poszukiwaniu słońca",
    startDate: new Date(2025, 3, 29),
    endDate: new Date(2025, 4, 2),
  },
  {
    id: 3,
    title: "W poszukiwaniu słońca",
    startDate: new Date(2025, 3, 29),
    endDate: new Date(2025, 4, 2),
  },
  {
    id: 3,
    title: "W poszukiwaniu słońca2",
    startDate: new Date(2025, 3, 29),
    endDate: new Date(2025, 4, 2),
  },
];

export const SimpleCallendar = () => {
  const [actualDate, setActualDate] = useState(new Date());
  const [actual7DaysRange, setActual7DaysRange] = useState<
    { date: Date; isCurrentMonth: boolean }[]
  >([]);

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

  const books =
    actual7DaysRange.length === 7
      ? getBooksInWeek(actual7DaysRange, mockBooks)
      : [];

  return (
    <div className="grow min-h-[200px] lg:min-h-0 bg-white/90 shadow-[0px_1px_14px_0px_rgba(0,0,0,0.3)] rounded-4xl flex flex-col  p-4">
      <div className="flex w-full flex-row justify-between items-center lg:px-5">
        <div className="flex  flex-row items-center gap-3 lg:gap-10 ">
          {actual7DaysRange.length === 7 && (
            <CallendarNavigation
              handleDateChange={handleDateChange}
              dateRange={[actual7DaysRange[0].date, actual7DaysRange[6].date]}
            />
          )}

          <span className="font-extrabold text-sm lg:text-3xl text-[#A449FF]">
            {actualDateString}
          </span>
        </div>

        <Button className="px-1 py-1! ml-1">Expand</Button>
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

        <div className="grid grid-cols-7 border rounded-xl divide-x-1 relative z-1 min-h-[150px] md:min-h-[220px] lg:h-full overflow-hidden">
          <div className=" custom-scroll overflow-y-auto px-1 max-h-[70%] md:max-h-7/8  grid grid-cols-14 gap-px bg-transparent absolute w-full top-5 text-[8px] md:text-xs">
            {books.map(
              (book, idx) =>
                book && (
                  <div
                    key={idx}
                    className={`${colStartClasses[book.start!]} ${
                      colSpanClasses[book.span!]
                    } ${
                      book.color
                    } rounded-4xl text-xs lg:text-lg text-center text-nowrap overflow-auto`}
                  >
                    {book?.title}
                  </div>
                )
            )}
          </div>

          {actual7DaysRange.map((day, dayIdx) => (
            <div
              key={`day-${dayIdx}`}
              className={`flex flex-col h-full ${
                day.isCurrentMonth ? "" : "bg-gray-100"
              } ${dayIdx === 6 ? "rounded-r-xl" : ""}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
