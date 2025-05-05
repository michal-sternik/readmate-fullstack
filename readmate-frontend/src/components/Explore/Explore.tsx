import React, { useEffect, useState } from "react";

import { exploreMockBooks } from "../../lib/constants";

import { BookList } from "../BookList/BookList";
import { Pagination } from "../Pagination/Pagination";
import { ExploreBook } from "../../types/booktypes";

const books = {
  items: exploreMockBooks.items.map(
    (book): ExploreBook => ({
      id: book.id,
      volumeInfo: {
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        publishedDate: book.volumeInfo.publishedDate,
        infoLink: book.volumeInfo.infoLink,
        categories: book.volumeInfo.categories,
        imageLinks: book.volumeInfo.imageLinks,
      },
    })
  ),
};

export const Explore = () => {
  const [showPagination, setShowPagination] = useState(false);
  //   const [currentBook, setCurrentBook] = useState<Book>({})
  //   const [formVisibility, setFormVisibility] = useState<'visible' | 'hidden'>('hidden')

  useEffect(() => {
    if (books.items.length !== 0) {
      setShowPagination(true);
    }
  }, [books.items.length]);

  //   const toggleFormVisibility = () => {
  //     setFormVisibility((prev) => (prev === 'hidden' ? 'visible' : 'hidden'))
  //   }

  return (
    <div className="w-full h-full flex flex-col ">
      <BookList
        bookList={books.items}
        // typing={typing}
        // toggleFormVisibility={toggleFormVisibility}
        // setCurrentBook={setCurrentBook}
      />

      <div className=" flex items-center pt-5 lg:pt-0">
        {showPagination && (
          <Pagination handlePageChange={() => {}} actualPage={1} />
        )}
      </div>

      {/* <AddBook currentBook={currentBook} formVisibility={formVisibility} /> */}
    </div>
  );
};
