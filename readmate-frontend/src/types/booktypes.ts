export type Book = {
  id: number;
  title: string;
  startDate: Date;
  endDate?: Date;
};

export interface CallendarBook extends Book {
  color: string;
  start: number;
  span: number;
}
