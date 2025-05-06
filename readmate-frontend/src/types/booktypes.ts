export type ExploreBook = {
  id: string;
  title: string;
  authors?: string[];
  publishedDate?: string;
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
// };
