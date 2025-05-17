import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import Face2RoundedIcon from "@mui/icons-material/Face2Rounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Avatar, IconButton, Tooltip } from "@mui/material";

import { PaginatedBooks } from "../../types/booktypes";
import { Pagination } from "../Pagination/Pagination";
import { NavLink } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { MAX_RESULTS_PER_USER_PAGE } from "../../lib/constants";
import { BookService } from "../../api/services/bookService";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Gender } from "../../types/usertypes";
import { convertAndDisplayError, formatFullDate } from "../../lib/utils";

import { toast } from "react-toastify";
import { UserProfileBook } from "../UserProfileBook/UserProfileBook";
const swrConfig = {
  revalidateOnFocus: true,
  revalidateOnReconnect: false,
  dedupingInterval: 60000,
};
export const UserProfile = () => {
  const user = useSelector((state: RootState) => state.user);

  const [currentPage, setCurrentPage] = useState<number>(1);
  // const booksFromDatabase: Book[] = mockBookCollection.map((book) => ({
  //   ...book,
  //   publishedDate: book.publishedDate
  //     ? new Date(book.publishedDate)
  //     : undefined,
  //   startDate: new Date(book.startDate),
  //   endDate: book.endDate ? new Date(book.endDate) : undefined,
  // }));

  // const paginatedBooks = {
  //   currentPage: 1,
  //   totalPages: 5,
  //   totalItems: 27,
  //   itemsPerPage: 6,
  //   items: booksFromDatabase,
  // };

  const {
    data: paginatedBooks,
    error,
    isLoading,
  } = useSWR<PaginatedBooks>(
    `/book?page=${currentPage}&itemsPerPage=${MAX_RESULTS_PER_USER_PAGE}`,
    BookService.getPaginatedBooks,
    swrConfig
  );

  const handlePageChange = (direction: -1 | 1) => {
    setCurrentPage(currentPage + direction);
  };

  const deleteBook = async (bookId: string) => {
    try {
      await BookService.deleteBook(bookId);
      mutate(
        `/book?page=${currentPage}&itemsPerPage=${MAX_RESULTS_PER_USER_PAGE}`
      );
      toast.success("Book deleted.");
    } catch (error) {
      convertAndDisplayError(error);
    }
  };

  useEffect(() => {
    mutate(
      `/book?page=${currentPage}&itemsPerPage=${MAX_RESULTS_PER_USER_PAGE}`
    );
  }, [currentPage]);
  return (
    <div className="flex flex-col gap-5 w-full h-full ">
      <div className="flex flex-col lg:flex-row gap-5 w-full h-40 p-5 bg-purple-500/10 rounded-4xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.2)] ">
        <div className="flex flex-row w-full gap-5 items-center justify-start">
          {user.error ? (
            <div className="text-red-600 text-lg font-bold">
              Error loading profile. Please try again later.
            </div>
          ) : user.loading ? (
            <div className="text-red-600 text-lg font-bold">
              Loading user profile.
            </div>
          ) : user.user ? (
            <>
              <Avatar sx={{ bgcolor: "white", border: "1px solid black" }}>
                {user.user.gender === Gender.MALE ? (
                  <FaceRoundedIcon className=" text-blue-500" />
                ) : user.user.gender === Gender.FEMALE ? (
                  <Face2RoundedIcon className=" text-pink-500" />
                ) : (
                  <AccountCircleRoundedIcon className=" text-yellow-500" />
                )}
              </Avatar>

              <div className="text-md lg:text-2xl text-[#A449FF] font-extrabold whitespace-nowrap">
                {user.user.username} {`(${user.user.age})`}
              </div>
              <div className="text-md lg:text-xl text-[#A449FF] font-mediu">
                joined{" "}
                <span className="text-md lg:text-xl font-extrabold text-[#A449FF]">
                  {Math.floor(
                    (new Date().getTime() -
                      new Date(user.user.createdAt).getTime()) /
                      (1000 * 3600 * 24)
                  )}
                </span>{" "}
                days ago
              </div>
            </>
          ) : (
            <div className="text-red-600 text-lg font-bold">
              Error loading profile. Please try again later.
            </div>
          )}
        </div>
        <div className="flex h-full items-center justify-center">
          <div className="flex  w-full h-full items-center text-[#A449FF] font-extrabold  ">
            {paginatedBooks ? (
              <>
                <div className="whitespace-nowrap overflow-x-auto scrollbar-hide">
                  Total books: {paginatedBooks.totalItems}
                </div>
                <Pagination
                  actualPage={currentPage}
                  totalPages={paginatedBooks.totalPages}
                  handlePageChange={handlePageChange}
                ></Pagination>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="overflow-auto h-full custom-scroll max-h-130 flex flex-col gap-5 w-full p-5  rounded-4xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.2)] ">
        {error ? (
          <div className="text-red-600 text-lg font-bold">
            Error loading books. Please try again later.
          </div>
        ) : isLoading ? (
          <span>loading</span>
        ) : (
          paginatedBooks &&
          paginatedBooks.totalItems > 0 &&
          paginatedBooks.items.map((book) => (
            <UserProfileBook book={book} deleteBook={deleteBook} />
          ))
        )}
      </div>
    </div>
  );
};

const mockBookCollection = [
  {
    id: "dQHSTqR7ijUC",
    title: "Manufacturing Execution System - MES",
    authors: ["Jürgen Kletti", "Testowy"],
    publishedDate: "2007-05-01 00:00:00",
    link: "https://play.google.com/store/books/details?id=dQHSTqR7ijUC&source=gbs_api",
    categories: ["Business & Economics"],
    pageCount: 276,
    description: "The transformation of the classic factory...",
    imageLink:
      "http://books.google.com/books/content?id=dQHSTqR7ijUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    startDate: "2023-01-01 00:00:00",
    endDate: null,
  },
  {
    id: "pik30Yy6eEcC",
    title: "MES Guide for Executives",
    authors: ["Bianca Scholten"],
    publishedDate: "2009-01-01 00:00:00",
    link: "http://books.google.pl/books?id=pik30Yy6eEcC&dq=mes&hl=&source=gbs_api",
    categories: ["Business & Economics"],
    pageCount: 175,
    description: "Are you having trouble demonstrating to management...",
    imageLink:
      "http://books.google.com/books/content?id=pik30Yy6eEcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    startDate: "2023-01-31 00:00:00",
    endDate: "2023-03-07 00:00:00",
  },
  {
    id: "dQHSTqR7ijUC2",
    title: "Manufacturing Execution System - MES",
    authors: ["Jürgen Kletti", "Testowy"],
    publishedDate: "2007-05-01 00:00:00",
    link: "https://play.google.com/store/books/details?id=dQHSTqR7ijUC&source=gbs_api",
    categories: ["Business & Economics"],
    pageCount: 276,
    description: "The transformation of the classic factory...",
    imageLink:
      "http://books.google.com/books/content?id=dQHSTqR7ijUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    startDate: "2023-01-01 00:00:00",
    endDate: "2023-02-13 00:00:00",
  },
  {
    id: "pik30Yy6eEcC2",
    title: "MES Guide for Executives",
    authors: ["Bianca Scholten"],
    publishedDate: "2009-01-01 00:00:00",
    link: "http://books.google.pl/books?id=pik30Yy6eEcC&dq=mes&hl=&source=gbs_api",
    categories: ["Business & Economics"],
    pageCount: 175,
    description: "Are you having trouble demonstrating to management...",
    imageLink:
      "http://books.google.com/books/content?id=pik30Yy6eEcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    startDate: "2023-01-31 00:00:00",
    endDate: "2023-03-07 00:00:00",
  },
  {
    id: "dQHSTqR7ijUC3",
    title: "Manufacturing Execution System - MES",
    authors: ["Jürgen Kletti", "Testowy"],
    publishedDate: "2007-05-01 00:00:00",
    link: "https://play.google.com/store/books/details?id=dQHSTqR7ijUC&source=gbs_api",
    categories: ["Business & Economics"],
    pageCount: 276,
    description: "The transformation of the classic factory...",
    imageLink:
      "http://books.google.com/books/content?id=dQHSTqR7ijUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    startDate: "2023-01-01 00:00:00",
    endDate: "2023-02-13 00:00:00",
  },
  {
    id: "pik30Yy6eEcC3",
    title: "MES Guide for Executives",
    authors: ["Bianca Scholten"],
    publishedDate: "2009-01-01 00:00:00",
    link: "http://books.google.pl/books?id=pik30Yy6eEcC&dq=mes&hl=&source=gbs_api",
    categories: ["Business & Economics"],
    pageCount: 175,
    description: "Are you having trouble demonstrating to management...",
    imageLink:
      "http://books.google.com/books/content?id=pik30Yy6eEcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    startDate: "2023-01-31 00:00:00",
    endDate: "2023-03-07 00:00:00",
  },
];
