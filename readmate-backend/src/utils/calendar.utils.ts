import { BookWithDates } from 'src/book/types/bookwithdates.type';
import { CalendarBook } from 'src/book/types/calendarbook.type';

const WEEKSPLIT = 14;
const WEEKDURATION = 7;

export const getBooksInWeek = (
  week: { date: Date }[],
  books: BookWithDates[],
): CalendarBook[] => {
  if (!week || week.length === 0) return [];

  const firstDayOfTheWeek = week[0].date;
  const lastDayOfTheWeek = week[week.length - 1].date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const booksInWeek: Omit<CalendarBook, 'color'>[] = books.flatMap((book) => {
    // const effectiveEndDate = book.endDate ? book.endDate : today;
    //konwersja dat na obiekty Date na potrzeby tej funkcji
    const startDate = new Date(book.startDate);
    const endDate = book.endDate ? new Date(book.endDate) : today;
    //najpierw sprawdzamy najczestszy przypadek czyli czy ksiazka w ogole jest czytana w danym tygodniu
    if (
      (startDate.getTime() < firstDayOfTheWeek.getTime() &&
        endDate.getTime() < firstDayOfTheWeek.getTime()) ||
      (startDate.getTime() > lastDayOfTheWeek.getTime() &&
        endDate.getTime() > lastDayOfTheWeek.getTime())
    ) {
      return [];
      //teraz sprawdzamy drugi najczęstszy przypadek, czyli czy książka była czytana cały dany tydzień
    } else if (
      startDate.getTime() < firstDayOfTheWeek.getTime() &&
      endDate.getTime() > lastDayOfTheWeek.getTime()
    ) {
      return { ...book, start: 1, span: 14 };
      //teraz przypadek, gdy książka była przeczytana w trakcie trwania jednego tygodnia
    } else if (
      startDate.getTime() >= firstDayOfTheWeek.getTime() &&
      endDate.getTime() <= lastDayOfTheWeek.getTime()
    ) {
      const calculateColStart =
        2 +
        (dateDiffInDays(startDate, firstDayOfTheWeek) * WEEKSPLIT) /
          WEEKDURATION;
      const calculateSpan = 2 * dateDiffInDays(startDate, endDate);
      return {
        ...book,
        start: calculateColStart,
        span: calculateSpan,
      };
      //teraz przypadek, gdy książkę zaczęto czytać w danym tygodniu ale jej nie skończono
    } else if (
      startDate.getTime() >= firstDayOfTheWeek.getTime() &&
      endDate.getTime() > lastDayOfTheWeek.getTime()
    ) {
      const calculateColStart =
        2 +
        (dateDiffInDays(startDate, firstDayOfTheWeek) * WEEKSPLIT) /
          WEEKDURATION;
      const calculateSpan = WEEKSPLIT - calculateColStart + 1;
      return {
        ...book,
        start: calculateColStart,
        span: calculateSpan,
      };
      //teraz przypadek gdy książkę zaczęto czytać wcześniej i skończono w danym tygodniu
    } else if (
      startDate.getTime() < firstDayOfTheWeek.getTime() &&
      endDate.getTime() <= lastDayOfTheWeek.getTime()
    ) {
      const calculateColStart = 1;
      const calculateSpan =
        calculateColStart +
        (dateDiffInDays(endDate, firstDayOfTheWeek) * WEEKSPLIT) / WEEKDURATION;
      return {
        ...book,
        start: calculateColStart,
        span: calculateSpan,
      };
    } else return [];
  });

  const tailwindColors = [
    'bg-red-300',
    'bg-blue-300',
    'bg-green-300',
    'bg-yellow-300',
    'bg-purple-300',
    'bg-pink-300',
    'bg-indigo-300',
    'bg-teal-300',
    'bg-orange-300',
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
