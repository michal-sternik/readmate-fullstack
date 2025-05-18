import { MAX_RESULTS_PER_USER_PAGE } from "../../lib/constants";
import { Book, BookIdWithDates, PaginatedBooks } from "../../types/booktypes";
import defaultImage from "../../assets/images/defaultimgcover.jpg";
import { booksApi } from "../api";

export class BookService {
  //swr fetcher
  public static async searchBookBySearchPhrase(url: string) {
    return (await booksApi.get(url)).data;
  }
  public static async addBook(addBookDto: Book) {
    return await booksApi.post("/book", addBookDto);
  }
  public static async editBook(bookId: string, editBookDto: BookIdWithDates) {
    return await booksApi.patch(`/book/${bookId}`, editBookDto);
  }
  public static async deleteBook(bookId: string) {
    return await booksApi.delete(`/book/${bookId}`);
  }
  public static async getSingleBookById(bookId: string) {
    return await booksApi.get(bookId);
  }
  //swr fetcher
  public static async getPaginatedBooks(url: string) {
    const data: PaginatedBooks = await (await booksApi.get(url)).data;
    const items = data.items.map((book: Book) => ({
      ...book,
      imageLink: book.imageLink ? book.imageLink : defaultImage,
      startDate: new Date(book.startDate),
      endDate: book.endDate ? new Date(book.endDate) : undefined,
      publishedDate: book.publishedDate
        ? new Date(book.publishedDate)
        : undefined,
    }));
    return { ...data, items };
  }
  public static async adminGetUserPaginatedBooks(
    page: number,
    itemsPerPage: number = MAX_RESULTS_PER_USER_PAGE,
    userId?: number
  ) {
    return await booksApi.get(
      `/book?page=${page}&itemsPerPage=${itemsPerPage}&userId=${userId}`
    );
  }
  public static async getStatisticsForYear(year: number) {
    return (await booksApi.get(`/book/statistics?year=${year}`)).data;
  }

  public static async getCalendar(url: string) {
    const data = (await booksApi.get(url)).data;
    return data.map((book: Book) => ({
      ...book,
      startDate: new Date(book.startDate),
      endDate: book.endDate ? new Date(book.endDate) : undefined,
      publishedDate: book.publishedDate
        ? new Date(book.publishedDate)
        : undefined,
    }));
  }
}
