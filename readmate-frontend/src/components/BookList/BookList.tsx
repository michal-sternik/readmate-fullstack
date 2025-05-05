import React from "react";
import { SingleBook } from "../SingleBook/SingleBook";
import { ExploreBook } from "../../types/booktypes";

// import ExploreSkeleton from "../Skeletons/ExploreSkeleton/ExploreSkeleton";

type BookListProps = {
  bookList: ExploreBook[];
};

export const BookList = ({ bookList }: BookListProps) => {
  const typing = false;
  return (
    <div className="gap-y-5 overflow-auto custom-scroll w-full h-full flex flex-row flex-wrap justify-around items-center">
      {typing
        ? Array.from({ length: 9 }, (_, i) => <div key={i}>loading...</div>)
        : bookList.map((book) => (
            <SingleBook
              key={book.id}
              book={book}

              //   toggleFormVisibility={toggleFormVisibility}
              //   setCurrentBook={setCurrentBook}
            />
          ))}
    </div>
  );
};
