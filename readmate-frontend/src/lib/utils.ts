import dayjs, { Dayjs } from "dayjs";
import { Book, CallendarBook, SkeletonCalendarBook } from "../types/booktypes";
import { WEEKSPLIT, WEEKDURATION } from "./constants";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const getBooksInWeek = (
  week: { date: Date }[],
  books: Book[]
): CallendarBook[] => {
  if (!week || week.length === 0) return [];

  const firstDayOfTheWeek = week[0].date;
  const lastDayOfTheWeek = week[week.length - 1].date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const booksInWeek: Omit<CallendarBook, "color">[] = books.flatMap((book) => {
    const effectiveEndDate = book.endDate ? book.endDate : today;
    //najpierw sprawdzamy najczestszy przypadek czyli czy ksiazka w ogole jest czytana w danym tygodniu
    if (
      (book.startDate.getTime() < firstDayOfTheWeek.getTime() &&
        effectiveEndDate.getTime() < firstDayOfTheWeek.getTime()) ||
      (book.startDate.getTime() > lastDayOfTheWeek.getTime() &&
        effectiveEndDate.getTime() > lastDayOfTheWeek.getTime())
    ) {
      return [];
      //teraz sprawdzamy drugi najczęstszy przypadek, czyli czy książka była czytana cały dany tydzień
    } else if (
      book.startDate.getTime() < firstDayOfTheWeek.getTime() &&
      effectiveEndDate.getTime() > lastDayOfTheWeek.getTime()
    ) {
      return { ...book, start: 1, span: 14 };
      //teraz przypadek, gdy książka była przeczytana w trakcie trwania jednego tygodnia
    } else if (
      book.startDate.getTime() >= firstDayOfTheWeek.getTime() &&
      effectiveEndDate.getTime() <= lastDayOfTheWeek.getTime()
    ) {
      const calculateColStart =
        2 +
        (dateDiffInDays(book.startDate, firstDayOfTheWeek) * WEEKSPLIT) /
          WEEKDURATION;
      const calculateSpan =
        2 * dateDiffInDays(book.startDate, effectiveEndDate);
      return {
        ...book,
        start: calculateColStart,
        span: calculateSpan,
      };
      //teraz przypadek, gdy książkę zaczęto czytać w danym tygodniu ale jej nie skończono
    } else if (
      book.startDate.getTime() >= firstDayOfTheWeek.getTime() &&
      effectiveEndDate.getTime() > lastDayOfTheWeek.getTime()
    ) {
      const calculateColStart =
        2 +
        (dateDiffInDays(book.startDate, firstDayOfTheWeek) * WEEKSPLIT) /
          WEEKDURATION;
      const calculateSpan = WEEKSPLIT - calculateColStart + 1;
      return {
        ...book,
        start: calculateColStart,
        span: calculateSpan,
      };
      //teraz przypadek gdy książkę zaczęto czytać wcześniej i skończono w danym tygodniu
    } else if (
      book.startDate.getTime() < firstDayOfTheWeek.getTime() &&
      effectiveEndDate.getTime() <= lastDayOfTheWeek.getTime()
    ) {
      const calculateColStart = 1;
      const calculateSpan =
        calculateColStart +
        (dateDiffInDays(effectiveEndDate, firstDayOfTheWeek) * WEEKSPLIT) /
          WEEKDURATION;
      return {
        ...book,
        start: calculateColStart,
        span: calculateSpan,
      };
    } else return [];
  });

  const tailwindColors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-indigo-300",
    "bg-teal-300",
    "bg-orange-300",
  ];

  const booksWithColor = booksInWeek.map((book, index) => {
    const colorClass = tailwindColors[index % tailwindColors.length];
    return {
      ...book,
      color: colorClass,
    };
  });

  return booksWithColor;
};

export const dateDiffInDays = (a: Date, b: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
};

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day < 10 ? "0" : ""}${day}.${month < 10 ? "0" : ""}${month}`;
};

export const toDateOrUndefined = (
  day: Dayjs | null | undefined
): Date | undefined => {
  return day ? new Date(dayjs(day).format("YYYY-MM-DD")) : undefined;
};

export const formatFullDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const convertAndDisplayError = (e: unknown) => {
  console.log(e);
  const error = e as AxiosError<{ message?: string | string[] }>;

  let message = "Something went wrong!";
  const backendMessage = error.response?.data?.message;

  if (Array.isArray(backendMessage)) {
    message = backendMessage[0] || message;
  } else if (typeof backendMessage === "string") {
    message = backendMessage;
  }

  toast.error(message);
};

export const generateSkeletonBooksForWeek = (): SkeletonCalendarBook[] => {
  const numberOfSkeletonBooks = Math.floor(Math.random() * 3) + 1; // 1–3 książki
  const skeletonBooks: SkeletonCalendarBook[] = [];

  for (let i = 0; i < numberOfSkeletonBooks; i++) {
    const start = Math.floor(Math.random() * 8) + 1; // od 1 do 8
    const span = Math.floor(Math.random() * (14 - start)) + 1;
    skeletonBooks.push({
      start,
      span,
    });
  }

  return skeletonBooks;
};

export const validateStartDate = (start: Dayjs | null): string | null => {
  if (!start) return "Start date cannot be empty.";
  if (start.isAfter(dayjs(), "day"))
    return "Start date cannot be in the future.";
  if (start.isBefore(dayjs("1900-01-01"), "day"))
    return "Start date cannot be earlier than 01.01.1900.";
  return null;
};

export const validateEndDate = (
  end: Dayjs | null,
  start: Dayjs | null
): string | null => {
  if (!end) return null;
  if (end.isBefore(dayjs("1900-01-01"), "day"))
    return "End date cannot be earlier than 01.01.1900.";
  if (start && end.startOf("day").diff(start.startOf("day"), "day") === 0)
    return "End date must be at least 1 day after start date.";
  if (start && end.isBefore(start))
    return "End date cannot be earlier than start date.";
  if (end.isAfter(dayjs(), "day")) return "End date cannot be in the future.";
  return null;
};
