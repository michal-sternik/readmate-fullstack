import React from "react";
import defaultImage from "../../assets/images/defaultimgcover.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { Tooltip, IconButton } from "@mui/material";
import Icon from "../../assets/svg/addBook.svg?react";
import { ExploreBook } from "../../types/booktypes";
// import Tooltip from "@mui/material/Tooltip";
// import IconButton from "@mui/material/IconButton";

type SingleBookProps = {
  book: ExploreBook;
};

export const SingleBook = ({ book }: SingleBookProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden xl:w-3/10 h-3/10 bg-white opacity-90 shadow-lg rounded-4xl flex flex-row">
      <a
        className="flex min-w-20 max-w-3/10 "
        href={book.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={book.imageLink}
          alt={`${book.title} cover`}
          className="h-full w-full rounded-4xl transition duration-300 object-cover shadow-md hover:scale-105"
        />
      </a>
      <div className="flex flex-col grow w-full overflow-auto scrollbar-hide justify-around box-border p-3 ">
        <NavLink
          to="/addBook"
          state={{ book: book }}
          className="max-h-15 cursor-pointer font-medium xl:text:md 2xl:text-lg overflow-auto scrollbar-hide"
        >
          {book.title}
        </NavLink>
        <p className="font-extralight text-xs ">
          {book.authors?.join(", ") || "Unknown Author"}
        </p>
        <p className="font-light text-xs ">
          {book.publishedDate || "Unknown Date"}
        </p>
        <div className="w-full flex flex-row justify-between items-center ">
          <div className="flex w-3/4 items-center">
            <div className="bg-[#E1E1E1] border border-black rounded-4xl px-2 py-1 text-sm max-w-full">
              <div className="overflow-auto scrollbar-hide whitespace-nowrap">
                <span className="inline-block">
                  {book.categories?.join(", ")}
                </span>
              </div>
            </div>
          </div>

          <Tooltip title="Add this book!">
            <IconButton
              onClick={() => {
                navigate("/addBook", { state: { book: book } });
              }}
              size="small"
            >
              <Icon className="" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
