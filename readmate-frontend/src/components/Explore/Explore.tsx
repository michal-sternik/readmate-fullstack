import React, { use, useEffect, useState } from "react";

import { exploreMockBooks } from "../../lib/constants";
import defaultImage from "../../assets/images/defaultimgcover.jpg";

import { BookList } from "../BookList/BookList";
import { Pagination } from "../Pagination/Pagination";
import { ExploreBook } from "../../types/booktypes";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";

const books = {
  items: exploreMockBooks.items.map(
    (book): ExploreBook => ({
      id: book.id,

      title: book.volumeInfo.title,
      authors:
        typeof book.volumeInfo.authors === "undefined"
          ? book.volumeInfo.publisher
            ? [book.volumeInfo.publisher]
            : ["Unknown Author"]
          : book.volumeInfo.authors,
      publishedDate: book.volumeInfo.publishedDate
        ? new Date(book.volumeInfo.publishedDate)
        : undefined,
      link: book.volumeInfo.infoLink,
      categories:
        typeof book.volumeInfo.categories === "undefined"
          ? ["Other"]
          : book.volumeInfo.categories,
      imageLink:
        typeof book.volumeInfo.imageLinks === "undefined"
          ? defaultImage
          : book.volumeInfo.imageLinks.thumbnail ?? defaultImage,
      description: book.volumeInfo.description,
      pageCount: book.volumeInfo.pageCount,
    })
  ),
};

export const Explore = () => {
  const navigate = useNavigate();
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
        <div className="flex flex-row items-center justify-start w-full gap-2">
          <span className="inline lg:hidden xl:inline">
            Cannot find specified book?
          </span>
          <Button
            onClick={() => navigate("/addCustomBook")}
            className=" min-w-[150px]"
          >
            Add Custom Book
          </Button>
        </div>
        {showPagination && (
          <Pagination handlePageChange={() => {}} actualPage={1} />
        )}
      </div>

      {/* <AddBook currentBook={currentBook} formVisibility={formVisibility} /> */}
    </div>
  );
};
