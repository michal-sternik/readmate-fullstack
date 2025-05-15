import { Dayjs } from 'dayjs';

export function convertDayjsToString(date: Dayjs | null): string | null {
  return date ? date.toISOString().split('T')[0] : null;
}

export const generateCalendarDays = (
  currentYear: number,
  currentMonth: number,
) => {
  const days: { date: Date; isCurrentMonth: boolean }[] = [];
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

export const splitIntoWeeks = (
  days: { date: Date; isCurrentMonth: boolean }[],
) => {
  const weeks: { date: Date; isCurrentMonth: boolean }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
};
