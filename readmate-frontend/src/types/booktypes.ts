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

export type ExploreBook = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    infoLink?: string;
    categories?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
};
