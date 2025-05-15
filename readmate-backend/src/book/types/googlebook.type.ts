export interface GoogleBooksItem {
  id: string;
  volumeInfo: {
    title: string;
    description?: string;
    publishedDate?: string;
    pageCount?: number;
    authors?: string[];
    categories?: string[];
    infoLink?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    publisher?: string;
  };
}
