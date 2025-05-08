import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import Face2RoundedIcon from "@mui/icons-material/Face2Rounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Avatar } from "@mui/material";

import { Book } from "../../types/booktypes";
import { Pagination } from "../Pagination/Pagination";
import { NavLink } from "react-router-dom";

const exampleUser = {
  id: 1,
  username: "test",
  email: "test@test.com",
  gender: "male",
  createdAt: "2023-10-01T12:00:00Z",
  age: 25,
};

export const UserProfile = () => {
  const { username, gender, createdAt, age } = exampleUser;

  const booksFromDatabase: Book[] = mockBookCollection.map((book) => ({
    ...book,
    publishedDate: book.publishedDate
      ? new Date(book.publishedDate)
      : undefined,
    startDate: new Date(book.startDate),
    endDate: book.endDate ? new Date(book.endDate) : undefined,
  }));

  const paginatedBooks = {
    currentPage: 1,
    totalPages: 5,
    totalItems: 27,
    itemsPerPage: 6,
    items: booksFromDatabase,
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full ">
      <div className="flex flex-col lg:flex-row gap-5 w-full h-40 p-5 bg-purple-500/10 rounded-4xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.2)] ">
        <div className="flex flex-row w-full gap-5 items-center justify-start">
          <Avatar sx={{ bgcolor: "white", border: "1px solid black" }}>
            {gender === "male" ? (
              <FaceRoundedIcon className=" text-blue-500" />
            ) : gender === "female" ? (
              <Face2RoundedIcon className=" text-pink-500" />
            ) : (
              <AccountCircleRoundedIcon className=" text-yellow-500" />
            )}
          </Avatar>

          <div className="text-md lg:text-2xl text-[#A449FF] font-extrabold whitespace-nowrap">
            {username} {`(${age})`}
          </div>
          <div className="text-md lg:text-xl text-[#A449FF] font-mediu">
            joined{" "}
            <span className="text-md lg:text-xl font-extrabold text-[#A449FF]">
              {Math.floor(
                (new Date().getTime() - new Date(createdAt).getTime()) /
                  (1000 * 3600 * 24)
              )}
            </span>{" "}
            days ago
          </div>
        </div>
        <div className="flex h-full items-center justify-center">
          <div className="flex  w-full h-full items-center text-[#A449FF] font-extrabold  ">
            <div className="whitespace-nowrap overflow-x-auto scrollbar-hide">
              Total books: {paginatedBooks.totalItems}
            </div>
            <Pagination
              actualPage={paginatedBooks.currentPage}
              totalPages={paginatedBooks.totalPages}
              handlePageChange={() => {}}
            ></Pagination>
          </div>
        </div>
      </div>
      <div className="overflow-auto custom-scroll max-h-130 flex flex-col gap-5 w-full p-5  rounded-4xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.2)] ">
        {paginatedBooks.totalItems > 0 &&
          paginatedBooks.items.map((book) => (
            <div
              key={book.id}
              className="flex flex-col-reverse lg:flex-row gap-5 w-full p-5 justify-between items-start lg:items-center rounded-4xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.2)] "
            >
              <div className="flex flex-row gap-5">
                <a
                  className="flex min-w-20 max-w-3/10 "
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    className="w-16 h-24 object-cover  rounded-lg transition duration-300 shadow-md hover:scale-105"
                  />
                </a>
                <div className="flex flex-col grow w-full overflow-auto scrollbar-hide justify-around box-border  ">
                  <NavLink
                    to="/manageBook"
                    state={{ book: book }}
                    className="max-h-15 cursor-pointer font-medium xl:text:md 2xl:text-lg overflow-auto scrollbar-hide"
                  >
                    {book.title}
                  </NavLink>
                  <p className="font-extralight text-xs ">
                    {book.authors?.join(", ") || "Unknown Author"}
                  </p>
                  <p className="font-light text-xs ">
                    {book.publishedDate instanceof Date
                      ? book.publishedDate.toLocaleDateString()
                      : book.publishedDate || "Unknown Date"}
                  </p>
                  <div className="w-full flex flex-row justify-between items-center ">
                    <div className="flex w-3/4 items-center">
                      <div className=" border border-black rounded-4xl px-2  text-sm max-w-full">
                        <div className="overflow-auto scrollbar-hide whitespace-nowrap">
                          <span className="inline-block">
                            {book.categories?.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 text-[#A449FF]">
                  <p className="font-extralight  ">
                    {book.startDate.toLocaleDateString()} {" - "}{" "}
                    {book.endDate
                      ? book.endDate.toLocaleDateString()
                      : "Still reading"}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
