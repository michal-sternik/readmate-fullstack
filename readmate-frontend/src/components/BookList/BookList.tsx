import { SingleBook } from "../SingleBook/SingleBook";
import { ExploreBook } from "../../types/booktypes";
import { SingleBookSkeleton } from "../Skeletons/SingleBookSkeleon";

type BookListProps = {
  bookList: ExploreBook[] | undefined;
  isLoading: boolean;
};

export const BookList = ({ bookList, isLoading }: BookListProps) => {
  return (
    <div className="gap-y-5 overflow-auto custom-scroll w-full h-full flex flex-row flex-wrap justify-around items-center">
      {isLoading ? (
        Array.from({ length: 9 }, (_, i) => <SingleBookSkeleton key={i} />)
      ) : !bookList || bookList.length === 0 ? (
        <span className="m-20 text-[#A449FF] text-4xl text-center  font-bold">
          Nothing found. Search for books.
        </span>
      ) : (
        bookList.map((book) => <SingleBook key={book.id} book={book} />)
      )}
    </div>
  );
};
