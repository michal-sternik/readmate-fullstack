import { Book } from 'src/entities/book.entity';

export interface BookWithDates extends Book {
  startDate: string;
  endDate?: string | null;
}
