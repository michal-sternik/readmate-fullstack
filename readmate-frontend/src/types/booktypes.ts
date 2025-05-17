export type ExploreBook = {
  id: string;
  title: string;
  authors?: string[];
  publishedDate?: Date;
  link?: string;
  categories?: string[];
  pageCount?: number;
  description?: string;
  imageLink?: string;
};

export interface Book extends ExploreBook {
  startDate: Date;
  endDate?: Date;
}

export interface CallendarBook extends Book {
  color: string;
  start: number;
  span: number;
}
export type BookIdWithDates = {
  startDate: string;
  endDate?: string | null;
};
// export type ExploreBook = {
//   id: string;
//   volumeInfo: {
//     title: string;
//     authors?: string[];
//     publishedDate?: string;
//     infoLink?: string;
//     categories?: string[];
//     pageCount?: number;
//     description?: string;
//     imageLinks?: {
//       thumbnail?: string;
//     };
//   };
export type PaginatedBooks = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  items: Book[];
};
