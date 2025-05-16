import { ExploreBook } from "../../types/booktypes";

import { booksApi } from "../api";

export class BookService {
  public static async searchBookBySearchPhrase(url: string) {
    return (await booksApi.get(url)).data;
  }
}
