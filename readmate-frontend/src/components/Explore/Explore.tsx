import { useEffect, useState } from "react";

import { MAX_RESULTS_PER_EXPLORE_PAGE } from "../../lib/constants";

import { BookList } from "../BookList/BookList";
import { Pagination } from "../Pagination/Pagination";
import { ExploreBook } from "../../types/booktypes";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { BookService } from "../../api/services/bookService";
import useSWR from "swr";

const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60000,
};

export const Explore = () => {
  const navigate = useNavigate();
  const [showPagination, setShowPagination] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const searchPhrase = useSelector(
    (state: RootState) => state.searchInput.searchPhrase
  );
  const langRestrict = useSelector(
    (state: RootState) => state.searchInput.langRestrict
  );

  const {
    data: books,
    error,
    isLoading,
  } = useSWR<ExploreBook[] | undefined>(
    searchPhrase
      ? `/book/search?searchQuery=${searchPhrase}&startIndex=${currentPage}&maxResults=${MAX_RESULTS_PER_EXPLORE_PAGE}${
          langRestrict ? "&langRestrict=true" : ""
        }`
      : null,
    BookService.searchBookBySearchPhrase,
    swrConfig
  );

  useEffect(() => {
    if (books) {
      setShowPagination(true);
    }
  }, [books]);

  const handlePageChange = (direction: -1 | 1) => {
    setCurrentPage(currentPage + direction);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5 ">
      {error ? (
        <div className="text-red-600 text-lg font-bold">
          Error loading books. Please try again later.
        </div>
      ) : (
        <BookList bookList={books} isLoading={isLoading} />
      )}

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
          <Pagination
            handlePageChange={handlePageChange}
            actualPage={currentPage + 1}
          />
        )}
      </div>

      {/* <AddBook currentBook={currentBook} formVisibility={formVisibility} /> */}
    </div>
  );
};
