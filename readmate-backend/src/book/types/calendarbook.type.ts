import { BookWithDates } from './bookwithdates.type';

export interface CalendarBook extends BookWithDates {
  color: string;
  start: number;
  span: number;
}
